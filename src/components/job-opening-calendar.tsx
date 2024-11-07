'use client';

import { useMemo, useState } from 'react';
import useYearMonth from '@/hooks/use-year-month';
import { JobOpening } from '@/models/job-opening';
import DateNavigator from './ui/date-navigator';
import JobOpeningDisplay from './job-opening-display';
import Calendar from './ui/calendar';
import CarouselDialog, {
  CarouselDialogContent,
  CarouselDialogDescription,
  CarouselDialogHeader,
  CarouselDialogHeading,
  CarouselDialogTitle,
} from './ui/carousel-dialog';
import Image from 'next/image';
import { formatDate } from '@/utils/format-date';
import { getCalendarDateList } from '@/utils/get-calendar-date-list';
import { areSameDates } from '@/utils/are-same-dates';

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const { yearMonth, onChange } = useYearMonth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const cellDataList = useMemo(() => {
    if (!yearMonth) return [];

    const dates = getCalendarDateList(yearMonth.year, yearMonth.month);

    return dates.map((date) => ({
      date: date,
      startingJobOpenings: jobOpenings.filter(
        (jobOpening) =>
          jobOpening.startTime && areSameDates(jobOpening.startTime, date),
      ),
      endingJobOpenings: jobOpenings.filter(
        (jobOpening) =>
          jobOpening.endTime && areSameDates(jobOpening.endTime, date),
      ),
    }));
  }, [yearMonth, jobOpenings]);

  const sortedJobOpenings = cellDataList.flatMap((data) => [
    ...data.startingJobOpenings,
    ...data.endingJobOpenings,
  ]);

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
              {data.startingJobOpenings.map((opening) => (
                <JobOpeningDisplay
                  key={`starting-${opening.id}`}
                  jobOpening={opening}
                  status="starting"
                  onClick={() => {
                    const index = sortedJobOpenings.findIndex(
                      (jobOpening) => jobOpening.id === opening.id,
                    );
                    setCarouselIndex(index);
                    setDialogOpen(true);
                  }}
                />
              ))}
              {data.endingJobOpenings.map((opening) => (
                <JobOpeningDisplay
                  key={`ending-${opening.id}`}
                  jobOpening={opening}
                  status="ending"
                  onClick={() => {
                    const index = sortedJobOpenings.findIndex(
                      (jobOpening) => jobOpening.id === opening.id,
                    );
                    setCarouselIndex(index);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </>
          ),
        }))}
      />
    </div>
  );
}
