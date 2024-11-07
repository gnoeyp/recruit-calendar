import { renderHook } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import useYearMonth from './use-year-month';
import { useParams, useRouter } from 'next/navigation';
import { YearMonth } from '@/utils/year-month';

const mockedPush = vi.fn();
const mockedUseRouterReturn = { push: mockedPush };
vi.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouterReturn,
  useParams: vi.fn(),
}));

describe('useYearMonth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('YearMonth를 반환한다.', () => {
    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-01' });
    const { result } = renderHook(() => useYearMonth());
    expect(result.current.yearMonth?.month).toBe(1);
    expect(result.current.yearMonth?.year).toBe(2024);
  });

  it('잘못된 날짜에 대해 router.push를 호출한다.', () => {
    const date = new Date(2024, 0);
    vi.setSystemTime(date);
    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-13' });
    renderHook(() => useYearMonth());
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');

    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-12-01' });
    renderHook(() => useYearMonth());
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');

    vi.mocked(useParams).mockReturnValue({ yearmonth: '1' });
    renderHook(() => useYearMonth());
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');
  });

  it('onChange는 router.push를 호출한다.', () => {
    const { result } = renderHook(() => useYearMonth());
    result.current.onChange(new YearMonth(2024, 2));
    expect(useRouter().push).toHaveBeenCalledWith('/2024-02');
  });
});
