import { describe, it, expect } from 'vitest';
import { getCalendarDateList } from './get-calendar-date-list';

describe('getCalendarDateList', () => {
  it('주어진 연도와 월에 대한 올바른 날짜를 반환해야 합니다', () => {
    const dates = getCalendarDateList(2024, 10);
    expect(dates.length).toBe(35);
    expect(dates[0].getDay()).toBe(0); // 첫 번째 날짜는 일요일이어야 합니다
  });

  it('월의 첫 번째 날을 포함해야 합니다', () => {
    const dates = getCalendarDateList(2024, 10);
    const firstDayOfMonth = new Date(2024, 9, 1);
    expect(dates).toContainEqual(firstDayOfMonth);
  });

  it('월의 마지막 날을 포함해야 합니다', () => {
    const dates = getCalendarDateList(2024, 10);
    const lastDayOfMonth = new Date(2024, 9, 31);
    expect(dates).toContainEqual(lastDayOfMonth);
  });

  it('첫 번째 날짜', () => {
    const dates = getCalendarDateList(2024, 10);
    expect(dates[0]).toEqual(new Date(2024, 8, 29));
  });

  it('마지막 날짜', () => {
    const dates = getCalendarDateList(2024, 10);
    expect(dates[dates.length - 1]).toEqual(new Date(2024, 10, 2));
  });
});
