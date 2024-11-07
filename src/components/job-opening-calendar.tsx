'use client';

import { useEffect, useMemo, useState } from 'react';
import useYearMonth from '@/hooks/use-year-month';
import { JobOpening } from '@/models/job-opening';
import { formatDate } from '@/utils/format-date';
import { getCalendarDateList } from '@/utils/get-calendar-date-list';
import { areSameDates } from '@/utils/are-same-dates';
import DateNavigator from './ui/date-navigator';
import Calendar from './ui/calendar';
import CarouselDialog, {
  CarouselDialogContent,
  CarouselDialogDescription,
  CarouselDialogHeader,
  CarouselDialogHeading,
  CarouselDialogTitle,
} from './ui/carousel-dialog';
import Image from 'next/image';
import useVisited from '@/hooks/use-visited';
import CalendarListItem from './ui/calendar-list-item';
import TinyBadge from './ui/tiny-badge';
import { dateKey } from '@/utils/date-key';

enum JobOpeningStatus {
  STARTING = 'starting',
  ENDING = 'ending',
}

type JobOpeningCalendarItem = {
  jobOpening: JobOpening;
  date: Date;
  status: JobOpeningStatus;
  visited: boolean;
};

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const [visitedIds, setVisitedIds] = useVisited();

  const startingItems = useMemo(
    () =>
      jobOpenings.map((item) => ({
        jobOpening: item,
        date: item.startTime,
        status: JobOpeningStatus.STARTING,
        visited: item.id != null && visitedIds.includes(item.id),
      })),
    [jobOpenings, visitedIds],
  );
  const endingItems = useMemo(
    () =>
      jobOpenings.map((item) => ({
        jobOpening: item,
        date: item.endTime,
        status: JobOpeningStatus.ENDING,
        visited: item.id != null && visitedIds.includes(item.id),
      })),
    [jobOpenings, visitedIds],
  );

  const jobOpeningCalendarItems: JobOpeningCalendarItem[] = useMemo(
    () =>
      [...startingItems, ...endingItems].sort((a, b) => {
        if (areSameDates(a.date, b.date) && a.status === b.status) {
          return a.date.getTime() - b.date.getTime();
        } else if (areSameDates(a.date, b.date)) {
          return a.status === JobOpeningStatus.STARTING ? -1 : 1;
        }
        return a.date.getTime() - b.date.getTime();
      }),
    [startingItems, endingItems],
  );

  const dateMap = useMemo(() => {
    const result = new Map<string, JobOpeningCalendarItem[]>();
    jobOpeningCalendarItems.forEach((item) => {
      const { date } = item;
      const key = dateKey(date);
      if (!result.has(key)) {
        result.set(key, []);
      }
      result.get(key)?.push(item);
    });
    return result;
  }, [jobOpeningCalendarItems]);

  const { yearMonth, onChange } = useYearMonth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  console.log(
    carouselIndex,
    jobOpeningCalendarItems[carouselIndex].date,
    jobOpeningCalendarItems[carouselIndex].status,
  );

  const dates = useMemo(() => {
    if (!yearMonth) return [];
    return getCalendarDateList(yearMonth.year, yearMonth.month);
  }, [yearMonth]);

  const handleClickJobOpening = (
    jobOpening: JobOpening,
    status: JobOpeningStatus,
  ) => {
    const index = jobOpeningCalendarItems.findIndex(
      (item) => item.jobOpening.id === jobOpening.id && item.status === status,
    );
    setCarouselIndex(index);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (jobOpeningCalendarItems.length === 0) return;
    const item = jobOpeningCalendarItems[carouselIndex].jobOpening;
    if (item.id != null && !visitedIds.includes(item.id)) {
      setVisitedIds([...visitedIds, item.id]);
    }
  }, [carouselIndex, setVisitedIds, visitedIds, jobOpeningCalendarItems]);

  if (!yearMonth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col py-3 gap-5 items-center">
      <CarouselDialog
        open={dialogOpen}
        dataSource={jobOpeningCalendarItems}
        render={(data) => (
          <CarouselDialogContent>
            <CarouselDialogHeader>
              <CarouselDialogHeading>
                {data.jobOpening.companyName}
              </CarouselDialogHeading>
              <CarouselDialogTitle>{data.jobOpening.title}</CarouselDialogTitle>
              <CarouselDialogDescription>
                {formatDate(data.jobOpening.startTime)} ~{' '}
                {formatDate(data.jobOpening.endTime)}
              </CarouselDialogDescription>
            </CarouselDialogHeader>
            <Image
              key={data.jobOpening.id}
              src={data.jobOpening.imageUrl}
              alt={data.jobOpening.companyName ?? ''}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              loading="eager"
            />
          </CarouselDialogContent>
        )}
        onOpenChange={setDialogOpen}
        current={carouselIndex}
        onChange={setCarouselIndex}
      />
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <Calendar
        items={dates.map((date) => {
          const items = dateMap.get(dateKey(date));
          return {
            key: String(date.getTime()),
            header: (
              <div className="flex items-center justify-center">
                {date.getDate()}
              </div>
            ),
            content: (
              <>
                {items?.map(({ jobOpening, status, visited }) => (
                  <CalendarListItem
                    key={jobOpening.id}
                    onClick={() => handleClickJobOpening(jobOpening, status)}
                    dimmed={visited}
                  >
                    <div className="flex items-center gap-1 text-sm w-full">
                      {status === JobOpeningStatus.STARTING ? (
                        <TinyBadge variant="light">시</TinyBadge>
                      ) : (
                        <TinyBadge variant="dark">끝</TinyBadge>
                      )}
                      <div className="flex-1 overflow-hidden text-nowrap">
                        {jobOpening.companyName}
                      </div>
                    </div>
                  </CalendarListItem>
                ))}
              </>
            ),
          };
        })}
      />
    </div>
  );
}
