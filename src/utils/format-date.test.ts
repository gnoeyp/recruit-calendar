import { describe, it, expect } from 'vitest';
import { formatDate } from './format-date';

describe('formatDate', () => {
  it('날짜가 제공되지 않으면 빈 문자열을 반환해야 합니다', () => {
    expect(formatDate()).toBe('');
  });

  it('날짜를 올바르게 포맷해야 합니다', () => {
    const date = new Date(2024, 9, 25, 14, 5); // 2024년 10월 25일, 14:05
    expect(formatDate(date)).toBe('2024년 10월 25일 14:05');
  });

  it('한 자리 수의 시간과 분을 앞에 0을 붙여야 합니다', () => {
    const date = new Date(2024, 9, 5, 4, 7); // 2024년 10월 5일, 04:07
    expect(formatDate(date)).toBe('2024년 10월 5일 04:07');
  });

  it('연말 날짜를 올바르게 처리해야 합니다', () => {
    const date = new Date(2024, 11, 31, 23, 59); // 2024년 12월 31일, 23:59
    expect(formatDate(date)).toBe('2024년 12월 31일 23:59');
  });

  it('연초 날짜를 올바르게 처리해야 합니다', () => {
    const date = new Date(2024, 0, 1, 0, 0); // 2024년 1월 1일, 00:00
    expect(formatDate(date)).toBe('2024년 1월 1일 00:00');
  });
});
