import { describe, it, expect } from 'vitest';
import { YearMonth } from './year-month';

describe('YearMonth', () => {
  it('잘못된 year, month에 대해 에러를 던진다.', () => {
    expect(() => new YearMonth(2024, -1)).toThrowError();
    expect(() => new YearMonth(2024, 0)).toThrowError();
    expect(() => new YearMonth(2024, 1)).not.toThrowError();
    expect(() => new YearMonth(2024, 12)).not.toThrowError();
    expect(() => new YearMonth(2024, 13)).toThrowError();
    expect(() => new YearMonth(-1, 12)).toThrowError();
  });

  it('nextMonth()는 다음 달을 반환한다.', () => {
    const yearMonth = new YearMonth(2024, 1);
    const nextYearMonth = yearMonth.nextMonth();
    expect(nextYearMonth.year).toBe(2024);
    expect(nextYearMonth.month).toBe(2);
  });

  it('nextMonth()는 12월인 경우 연도를 증가시킨다.', () => {
    const yearMonth = new YearMonth(2024, 12);
    const nextYearMonth = yearMonth.nextMonth();
    expect(nextYearMonth.month).toBe(1);
    expect(nextYearMonth.year).toBe(2025);
  });

  it('previousMonth()는 이전 달을 반환한다.', () => {
    const yearMonth = new YearMonth(2024, 2);
    const prevYearMonth = yearMonth.previousMonth();
    expect(prevYearMonth.month).toBe(1);
    expect(prevYearMonth.year).toBe(2024);
  });

  it('previousMonth()는 1월인 경우 연도를 감소시킨다.', () => {
    const yearMonth = new YearMonth(2024, 1);
    const prevYearMonth = yearMonth.previousMonth();
    expect(prevYearMonth.month).toBe(12);
    expect(prevYearMonth.year).toBe(2023);
  });

  it('toString()은 "YYYY-MM" 형식의 문자열을 반환한다.', () => {
    const yearMonth = new YearMonth(2024, 1);
    expect(yearMonth.toString()).toBe('2024-01');
  });
});
