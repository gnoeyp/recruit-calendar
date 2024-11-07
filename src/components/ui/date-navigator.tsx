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
    <div className="flex items-center gap-5 text-lg">
      <button
        onClick={() => onChange?.(yearMonth.previousMonth())}
        aria-label="previous-month"
      >
        <FaAngleLeft size={12} color="#888" />
      </button>
      <h1 className="text-xl text-orange-500 font-bold">
        {yearMonth.year}.{String(yearMonth.month).padStart(2, '0')}
      </h1>
      <button
        onClick={() => onChange?.(yearMonth.nextMonth())}
        aria-label="next-month"
      >
        <FaAngleRight size={12} color="#888" />
      </button>
    </div>
  );
}
