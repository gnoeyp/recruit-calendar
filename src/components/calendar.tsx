'use client';

import useYearMonth from '@/lib/use-year-month';
import DateNavigator from './date-navigator';
import { JobOpening } from '@/models/job-opening';
import JobOpeningDisplay from './job-opening-display';
import CalendarCell from './calendar-cell';

type CalendarProps = {
  jobOpenings?: JobOpening[];
};

export default function Calendar({ jobOpenings = [] }: CalendarProps) {
  const { yearMonth, onChange } = useYearMonth();
  if (!yearMonth) {
    return <div>Loading...</div>;
  }

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

  const jobOpeningData = dates.map((date) => ({
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

  return (
    <div>
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <div className="grid grid-cols-7">
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          SUN
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          MON
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          TUE
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          WED
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          THR
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
          FRI
        </div>
        <div className="sticky top-0 bg-gray-200 flex items-center justify-center">
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
