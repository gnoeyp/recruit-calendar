import { describe, it, expect } from 'vitest';
import { YearMonth } from './year-month';

describe('YearMonth', () => {
  it('잘못된 year, month에 대해 에러를 던진다.', () => {
    expect(() => new YearMonth(-1, 2024)).toThrowError();
    expect(() => new YearMonth(0, 2024)).toThrowError();
    expect(() => new YearMonth(1, 2024)).not.toThrowError();
    expect(() => new YearMonth(12, 2024)).not.toThrowError();
    expect(() => new YearMonth(13, 2024)).toThrowError();
    expect(() => new YearMonth(12, -1)).toThrowError();
  });

  it('nextMonth()는 다음 달을 반환한다.', () => {
    const yearMonth = new YearMonth(1, 2024);
    const nextYearMonth = yearMonth.nextMonth();
    expect(nextYearMonth.month).toBe(2);
    expect(nextYearMonth.year).toBe(2024);
  });

  it('nextMonth()는 12월인 경우 연도를 증가시킨다.', () => {
    const yearMonth = new YearMonth(12, 2024);
    const nextYearMonth = yearMonth.nextMonth();
    expect(nextYearMonth.month).toBe(1);
    expect(nextYearMonth.year).toBe(2025);
  });

  it('previousMonth()는 이전 달을 반환한다.', () => {
    const yearMonth = new YearMonth(2, 2024);
    const prevYearMonth = yearMonth.previousMonth();
    expect(prevYearMonth.month).toBe(1);
    expect(prevYearMonth.year).toBe(2024);
  });

  it('previousMonth()는 1월인 경우 연도를 감소시킨다.', () => {
    const yearMonth = new YearMonth(1, 2024);
    const prevYearMonth = yearMonth.previousMonth();
    expect(prevYearMonth.month).toBe(12);
    expect(prevYearMonth.year).toBe(2023);
  });

  it('toString()은 "YYYY-MM" 형식의 문자열을 반환한다.', () => {
    const yearMonth = new YearMonth(1, 2024);
    expect(yearMonth.toString()).toBe('2024-01');
  });
});
