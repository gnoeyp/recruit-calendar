'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import useYearMonth from '@/hooks/use-year-month';
import { JobOpening } from '@/models/job-opening';
import { formatDate } from '@/utils/format-date';
import { getCalendarDateList } from '@/utils/get-calendar-date-list';
import { dateKey } from '@/utils/date-key';
import useVisited from '@/hooks/use-visited';
import DateNavigator from './ui/date-navigator';
import Calendar from './ui/calendar';
import CarouselDialog, {
  CarouselDialogContent,
  CarouselDialogDescription,
  CarouselDialogHeader,
  CarouselDialogHeading,
  CarouselDialogTitle,
} from './ui/carousel-dialog';
import CalendarListItem from './ui/calendar-list-item';
import TinyBadge from './ui/tiny-badge';
import {
  getCalendarItems,
  groupItemsByDate,
} from './job-opening-calendar.utils';
import { JobOpeningStatus } from './job-opening-calendar.types';
import { cn } from '@/utils/style';
import { areSameDates } from '@/utils/are-same-dates';

const VISITED_KEY = 'visited';

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const [visitedIds, setVisitedIds] = useVisited(VISITED_KEY);

  const calendarItems = useMemo(
    () => getCalendarItems(jobOpenings, visitedIds),
    [jobOpenings, visitedIds],
  );

  const calendarItemsByDate = useMemo(
    () => groupItemsByDate(calendarItems),
    [calendarItems],
  );

  const { yearMonth, onChange: onYearMonthChange } = useYearMonth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const dates = useMemo(() => {
    if (!yearMonth) return [];
    return getCalendarDateList(yearMonth.year, yearMonth.month);
  }, [yearMonth]);

  const handleClickJobOpening = (
    jobOpening: JobOpening,
    status: JobOpeningStatus,
  ) => {
    const index = calendarItems.findIndex(
      (item) => item.jobOpening.id === jobOpening.id && item.status === status,
    );
    setCarouselIndex(index);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (calendarItems.length === 0) return;
    const { jobOpening } = calendarItems[carouselIndex];
    if (jobOpening.id != null && !visitedIds.includes(jobOpening.id)) {
      setVisitedIds([...visitedIds, jobOpening.id]);
    }
  }, [carouselIndex, setVisitedIds, visitedIds, calendarItems]);

  if (!yearMonth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col py-3 gap-5 items-center">
      <CarouselDialog
        open={dialogOpen}
        dataSource={calendarItems}
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
      <DateNavigator yearMonth={yearMonth} onChange={onYearMonthChange} />
      <Calendar
        items={dates.map((date) => {
          const items = calendarItemsByDate.get(dateKey(date));
          return {
            key: String(date.getTime()),
            header: (
              <div
                className={cn(
                  'flex items-center justify-center w-full',
                  areSameDates(date, new Date()) && 'bg-orange-500 text-white',
                )}
              >
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
