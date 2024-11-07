'use client';

import { useMemo, useState } from 'react';
import useYearMonth from '@/lib/use-year-month';
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

  const jobOpeningData = useMemo(() => {
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

  const sortedJobOpenings = jobOpeningData.flatMap((data) => [
    ...data.startingJobOpenings,
    ...data.endingJobOpenings,
  ]);

  const [open, setOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  if (!yearMonth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col py-3 gap-5 items-center">
      <CarouselDialog
        open={open}
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
        onOpenChange={setOpen}
        current={carouselIndex}
      />
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <Calendar
        items={jobOpeningData.map((data) => ({
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
                    setOpen(true);
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
                    setOpen(true);
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
