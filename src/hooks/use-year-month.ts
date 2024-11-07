'use client';

import { YearMonth } from '@/utils/year-month';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useLayoutEffect, useState } from 'react';

const createYearMonth = (yearMonthStr: string): YearMonth | null => {
  try {
    const tokens = yearMonthStr.split('-').map(Number);
    if (tokens.length !== 2) {
      throw new Error();
    }
    const [year, month] = tokens;

    return new YearMonth(year, month);
  } catch {
    return null;
  }
};

/**
 * 연-월 값을 URL params와 연동하여 관리하는 커스텀 훅입니다.
 * URL 매개변수를 사용하여 초기 년-월 값을 결정하고, 다른 연-월 또는 현재 연-월로
 * 라우팅하는 기능을 제공합니다.
 */
export default function useYearMonth() {
  const { yearmonth: yearMonthStr } = useParams<{ yearmonth: string }>();
  const [yearMonth, setYearMonth] = useState<YearMonth | null>(
    createYearMonth(yearMonthStr),
  );
  const router = useRouter();

  const goTo = useCallback(
    (targetYearMonth: YearMonth) => {
      router.push(
        `/${targetYearMonth.year}-${String(targetYearMonth.month).padStart(
          2,
          '0',
        )}`,
      );
    },
    [router],
  );

  const goToCurrent = useCallback(() => {
    const currentYearMonth = new YearMonth(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );
    goTo(currentYearMonth);
  }, [goTo]);

  useLayoutEffect(() => {
    const newYearMonth = createYearMonth(yearMonthStr);
    if (newYearMonth === null) {
      goToCurrent();
      return;
    }
    setYearMonth(createYearMonth(yearMonthStr));
  }, [yearMonthStr, goToCurrent]);

  const handleChange = (newYearMonth: YearMonth) => {
    goTo(newYearMonth);
  };

  return {
    yearMonth,
    onChange: handleChange,
  };
}
