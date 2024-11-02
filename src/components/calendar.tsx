'use client';

import useYearMonth from '@/lib/use-year-month';
import DateNavigator from './date-navigator';
import { JobOpening } from '@/models/job-opening';

type CalendarProps = {
  jobOpenings: JobOpening[];
};

export default function Calendar({ jobOpenings }: CalendarProps) {
  const { yearMonth, onChange } = useYearMonth();
  if (!yearMonth) {
    return <div>Loading...</div>;
  }

  const date = new Date(yearMonth.year, yearMonth.month - 1, 1);
  const firstDay = date.getDay();

  console.log(firstDay);

  return (
    <div>
      <DateNavigator yearMonth={yearMonth} onChange={onChange} />
      <div></div>
    </div>
  );
}
