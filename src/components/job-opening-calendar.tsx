'use client';

import { useEffect, useMemo, useState } from 'react';
import useYearMonth from '@/hooks/use-year-month';
import { JobOpening } from '@/models/job-opening';
import { formatDate } from '@/utils/format-date';
import { getCalendarDateList } from '@/utils/get-calendar-date-list';
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
import {
  getCalendarItems,
  groupItemsByDate,
} from './job-opening-calendar.utils';
import { JobOpeningStatus } from './job-opening-calendar.types';

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const [visitedIds, setVisitedIds] = useVisited();

  const calendarItems = useMemo(
    () => getCalendarItems(jobOpenings, visitedIds),
    [jobOpenings, visitedIds],
  );

  const calendarItemsByDate = useMemo(
    () => groupItemsByDate(calendarItems),
    [calendarItems],
  );

  const { yearMonth, onChange } = useYearMonth();

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
    const item = calendarItems[carouselIndex].jobOpening;
    if (item.id != null && !visitedIds.includes(item.id)) {
      setVisitedIds([...visitedIds, item.id]);
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
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <Calendar
        items={dates.map((date) => {
          const items = calendarItemsByDate.get(dateKey(date));
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
