import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DateNavigator from './date-navigator';
import { YearMonth } from '@/utils/year-month';

describe('DateNavigator', () => {
  it('현재 연월을 표시해야 한다.', () => {
    const yearMonth = new YearMonth(2024, 10);
    render(<DateNavigator yearMonth={yearMonth} />);

    expect(screen.getByText('2024.10')).toBeDefined();
  });

  it('월이 한자리 수이면 0으로 시작해야 한다.', () => {
    const yearMonth = new YearMonth(2024, 9);
    render(<DateNavigator yearMonth={yearMonth} />);

    expect(screen.getByText('2024.09')).toBeDefined();
  });

  it('previous month 버튼이 눌렸을 때 onChange가 호출되어야 한다.', () => {
    const yearMonth = new YearMonth(2024, 10);
    const handleChange = vi.fn();
    render(<DateNavigator yearMonth={yearMonth} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous-month/i }));
    expect(handleChange).toHaveBeenCalledWith(yearMonth.previousMonth());
  });

  it('next month 버튼이 눌렸을 때 onChange가 호출되어야 한다.', () => {
    const yearMonth = new YearMonth(2024, 10);
    const handleChange = vi.fn();
    render(<DateNavigator yearMonth={yearMonth} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button', { name: /next-month/i }));
    expect(handleChange).toHaveBeenCalledWith(yearMonth.nextMonth());
  });
});
