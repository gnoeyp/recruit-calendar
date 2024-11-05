'use client';

import { useMemo } from 'react';
import useYearMonth from '@/lib/use-year-month';
import { JobOpening } from '@/models/job-opening';
import DateNavigator from './ui/date-navigator';
import JobOpeningDisplay from './job-opening-display';
import Calendar from './ui/calendar';

type JobOpeningCalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function JobOpeningCalendar({
  jobOpenings = [],
}: JobOpeningCalendarProps) {
  const { yearMonth, onChange } = useYearMonth();

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

  return (
    <div className="flex flex-col py-3 gap-5 items-center">
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
                />
              ))}
              {data.endingJobOpenings.map((opening) => (
                <JobOpeningDisplay
                  key={`ending-${opening.id}`}
                  jobOpening={opening}
                  status="ending"
                />
              ))}
            </>
          ),
        }))}
      />
    </div>
  );
}
