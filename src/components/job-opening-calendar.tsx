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

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const { yearMonth, onChange } = useYearMonth();

  // TODO: Refactoring
  const jobOpeningData = useMemo(() => {
    if (!yearMonth) return [];

    const date = new Date(yearMonth.year, yearMonth.month - 1, 1);

    while (date.getDay() !== 0) {
      date.setDate(date.getDate() - 1);
    }

    const dates: Date[] = [];

    while (true) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
      if (date.getMonth() === yearMonth.month % 12 && date.getDay() === 0) {
        break;
      }
    }

    return dates.map((date) => ({
      date: date,
      startingJobOpenings: jobOpenings.filter(
        (jobOpening) =>
          jobOpening.startTime?.getFullYear() === date.getFullYear() &&
          jobOpening.startTime?.getMonth() === date.getMonth() &&
          jobOpening.startTime?.getDate() === date.getDate(),
      ),
      endingJobOpenings: jobOpenings.filter(
        (jobOpening) =>
          jobOpening.endTime?.getFullYear() === date.getFullYear() &&
          jobOpening.endTime?.getMonth() === date.getMonth() &&
          jobOpening.endTime?.getDate() === date.getDate(),
      ),
    }));
  }, [yearMonth, jobOpenings]);

  if (!yearMonth) {
    return <div>Loading...</div>;
  }

  const sortedJobOpenings = jobOpeningData.flatMap((data) => [
    ...data.startingJobOpenings,
    ...data.endingJobOpenings,
  ]);

  const [open, setOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

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
              src={data.imageUrl ?? ''}
              alt={data.companyName ?? ''}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </CarouselDialogContent>
        )}
        onOpenChange={setOpen}
        current={carouselIndex}
        onChange={setCarouselIndex}
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
