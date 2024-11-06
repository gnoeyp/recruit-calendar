import { describe, it, expect } from 'vitest';
import { areSameDates } from './are-same-dates';

describe('areSameDates', () => {
  it('같은 날짜에 대해 true를 반환해야 합니다', () => {
    const date1 = new Date(2024, 9, 25);
    const date2 = new Date(2024, 9, 25);
    expect(areSameDates(date1, date2)).toBe(true);
  });

  it('다른 날짜에 대해 false를 반환해야 합니다', () => {
    const date1 = new Date(2024, 9, 25);
    const date2 = new Date(2024, 9, 26);
    expect(areSameDates(date1, date2)).toBe(false);
  });

  it('다른 달에 대해 false를 반환해야 합니다', () => {
    const date1 = new Date(2024, 8, 25);
    const date2 = new Date(2024, 9, 25);
    expect(areSameDates(date1, date2)).toBe(false);
  });

  it('다른 연도에 대해 false를 반환해야 합니다', () => {
    const date1 = new Date(2022, 9, 25);
    const date2 = new Date(2024, 9, 25);
    expect(areSameDates(date1, date2)).toBe(false);
  });

  it('다른 시간에 대해 같은 날짜에 대해 true를 반환해야 합니다', () => {
    const date1 = new Date(2024, 9, 25, 10, 30);
    const date2 = new Date(2024, 9, 25, 15, 45);
    expect(areSameDates(date1, date2)).toBe(true);
  });
});
