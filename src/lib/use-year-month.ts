'use client';

import { YearMonth } from '@/utils/year-month';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useYearMonth() {
  const { yearmonth: yearMonthStr } = useParams<{ yearmonth: string }>();
  const [yearMonth, setYearMonth] = useState<YearMonth | null>();
  const router = useRouter();

  useEffect(() => {
    const tokens = yearMonthStr.split('-').map(Number);
    if (tokens.length !== 2) {
      throw new Error();
    }
    const [year, month] = tokens;
    setYearMonth(new YearMonth(month, year));
  }, [yearMonthStr]);

  const handleChange = (newYearMonth: YearMonth) => {
    router.push(`/${newYearMonth.toString()}`);
  };

  return {
    yearMonth,
    onChange: handleChange,
  };
}
