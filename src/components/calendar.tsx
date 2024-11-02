'use client';

import useYearMonth from '@/lib/use-year-month';
import DateNavigator from './date-navigator';
import { JobOpening } from '@/models/job-opening';
import JobOpeningDisplay from './job-opening-display';

type CalendarCellData = {
  startingJobOpenings: JobOpening[];
  endingJobOpenings: JobOpening[];
};

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
    console.log('a');
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
        {jobOpeningData.map((data, index) => {
          return (
            <div key={index}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
