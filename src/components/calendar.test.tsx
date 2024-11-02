import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { useParams, useRouter } from 'next/navigation';
import Calendar from './calendar';

const mockedPush = vi.fn();
const mockedUseRouterReturn = { push: mockedPush };
vi.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouterReturn,
  useParams: vi.fn(),
}));

describe('Calendar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('올바른 날짜를 표시한다.', () => {
    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-01' });
    render(<Calendar />);
    expect(screen.getByRole('heading')).toHaveTextContent('2024 - 1');
  });

  it('잘못된 날짜이면 현재 날짜로 라우팅한다.', () => {
    const date = new Date(2024, 0);
    vi.setSystemTime(date);
    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-13' });
    render(<Calendar />);
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');

    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-12-01' });
    render(<Calendar />);
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');

    vi.mocked(useParams).mockReturnValue({ yearmonth: '1' });
    render(<Calendar />);
    expect(useRouter().push).toHaveBeenCalledWith('/2024-01');
  });

  it('초기 화면에서 Loading이 표시되지 않는다.', () => {
    vi.mocked(useParams).mockReturnValue({ yearmonth: '2024-01' });
    render(<Calendar />);
    expect(screen.queryByText('Loading...')).toBeNull();
  });
});
