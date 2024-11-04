'use client';

import { useMemo } from 'react';
import useYearMonth from '@/lib/use-year-month';
import { JobOpening } from '@/models/job-opening';
import CalendarCell from './calendar-cell';
import DateNavigator from './date-navigator';
import JobOpeningDisplay from './job-opening-display';

type CalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function Calendar({ jobOpenings = [] }: CalendarProps) {
  const { yearMonth, onChange } = useYearMonth();
  if (!yearMonth) {
    return <div>Loading...</div>;
  }

  const jobOpeningData = useMemo(() => {
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

  return (
    <div>
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <div className="grid grid-cols-7">
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          SUN
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          MON
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          TUE
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          WED
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          THR
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          FRI
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
          SAT
        </div>
        {jobOpeningData.map((data) => {
          return (
            <CalendarCell
              key={data.date.toString()}
              header={
                <div className="flex items-center justify-center">
                  {data.date.getDate()}
                </div>
              }
              content={
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
              }
            />
          );
        })}
      </div>
    </div>
  );
}
