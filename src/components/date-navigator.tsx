import { YearMonth } from '@/utils/year-month';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

type DateNavigatorProps = {
  yearMonth: YearMonth;
  onChange?: (yearMonth: YearMonth) => void;
};

export default function DateNavigator({
  yearMonth,
  onChange,
}: DateNavigatorProps) {
  return (
    <div className="flex items-center gap-2 text-lg">
      <button
        onClick={() => onChange?.(yearMonth.previousMonth())}
        aria-label="previous-month"
      >
        <FaAngleLeft />
      </button>
      {yearMonth.year} - {yearMonth.month}
      <button
        onClick={() => onChange?.(yearMonth.nextMonth())}
        aria-label="next-month"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
