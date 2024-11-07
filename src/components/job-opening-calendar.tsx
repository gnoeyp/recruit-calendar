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

type JobOpeningCalendarCellItem = {
  date: Date;
  items: {
    jobOpening: JobOpening;
    status: 'starting' | 'ending';
    visited: boolean;
  }[];
};

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const { yearMonth, onChange } = useYearMonth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [visitedIds, setVisitedIds] = useVisited();

  const cellDataList: JobOpeningCalendarCellItem[] = useMemo(() => {
    if (!yearMonth) return [];

    const dates = getCalendarDateList(yearMonth.year, yearMonth.month);

    const isStarting = (item: JobOpening, date: Date) =>
      item.startTime && areSameDates(item.startTime, date);
    const isEnding = (item: JobOpening, date: Date) =>
      item.endTime && areSameDates(item.endTime, date);

    return dates.map((date) => ({
      date: date,
      items: [
        ...jobOpenings
          .filter((item) => isStarting(item, date))
          .map((item) => ({
            jobOpening: item,
            status: 'starting' as const,
            visited: item.id != null && visitedIds.includes(item.id),
          })),
        ...jobOpenings
          .filter((item) => isEnding(item, date))
          .map((item) => ({
            jobOpening: item,
            status: 'ending' as const,
            visited: item.id != null && visitedIds.includes(item.id),
          })),
      ],
    }));
  }, [yearMonth, jobOpenings, visitedIds]);

  const sortedJobOpenings = useMemo(
    () =>
      cellDataList.flatMap((data) =>
        data.items.map(({ jobOpening }) => jobOpening),
      ),
    [cellDataList],
  );

  const handleClickJobOpening = (jobOpening: JobOpening) => {
    const index = sortedJobOpenings.findIndex(
      (item) => item.id === jobOpening.id,
    );
    setCarouselIndex(index);
    setDialogOpen(true);
  };

  useEffect(() => {
    const item = sortedJobOpenings[carouselIndex];
    console.log(item.id);
    if (item.id != null && !visitedIds.includes(item.id)) {
      setVisitedIds([...visitedIds, item.id]);
    }
  }, [carouselIndex, setVisitedIds, sortedJobOpenings, visitedIds]);

  if (!yearMonth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col py-3 gap-5 items-center">
      <CarouselDialog
        open={dialogOpen}
        dataSource={sortedJobOpenings}
        render={(data) => (
          <CarouselDialogContent>
            <CarouselDialogHeader>
              <CarouselDialogHeading>{data.companyName}</CarouselDialogHeading>
              <CarouselDialogTitle>{data.title}</CarouselDialogTitle>
              <CarouselDialogDescription>
                {formatDate(data.startTime)} ~ {formatDate(data.endTime)}
              </CarouselDialogDescription>
            </CarouselDialogHeader>
            <Image
              key={data.id}
              src={data.imageUrl ?? ''}
              alt={data.companyName ?? ''}
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
        items={cellDataList.map((data) => ({
          key: data.date.toString(),
          header: (
            <div className="flex items-center justify-center">
              {data.date.getDate()}
            </div>
          ),
          content: (
            <>
              {data.items.map(({ jobOpening, status, visited }) => (
                <CalendarListItem
                  key={jobOpening.id}
                  onClick={() => handleClickJobOpening(jobOpening)}
                  dimmed={visited}
                >
                  <div className="flex items-center gap-1 text-sm w-full">
                    {status === 'starting' && (
                      <TinyBadge variant="light">시</TinyBadge>
                    )}
                    {status === 'ending' && (
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
        }))}
      />
    </div>
  );
}
