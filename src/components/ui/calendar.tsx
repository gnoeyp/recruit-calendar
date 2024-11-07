import useCalendarHeader from '@/hooks/use-calendar-header';
import { useMemo } from 'react';

const HEADER_HEIGHT = 40;
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];

export type CalendarItem = {
  key: string;
  header: React.ReactNode;
  content: React.ReactNode;
};

type CalendarProps = {
  items: CalendarItem[];
};

export default function Calendar({ items }: CalendarProps) {
  const weeks = useMemo(
    () => [
      items.slice(0, 7),
      items.slice(7, 14),
      items.slice(14, 21),
      items.slice(21, 28),
      items.slice(28),
    ],
    [items],
  );

  const { contentWrapperRef, headerIndex } = useCalendarHeader(
    HEADER_HEIGHT,
    weeks.length,
  );

  const headers = headerIndex < weeks.length ? weeks[headerIndex] : [];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 w-full sticky top-0 bg-gray-200 h-5 text-sm text-gray-500 z-10">
        {DAYS.map((day) => (
          <div key={day} className="flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 w-full sticky top-5 shadow-[0_2px_4px_rgba(0,0,0,0.08)] z-10">
        {headers.map((headerItem) => (
          <Header key={headerItem.key}>{headerItem.header}</Header>
        ))}
      </div>
      <div ref={contentWrapperRef}>
        {weeks.map((row, index) => (
          <div className="grid grid-cols-7 w-full" key={index}>
            {row.map((item) => {
              return (
                <div key={item.key} className="flex flex-col min-h-52">
                  {index > 0 && <Header>{item.header}</Header>}
                  <div className="flex-1 border-r border-b pt-0.5 pb-2">
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-5 border-r border-b flex items-center justify-center text-sm text-gray-600">
      {children}
    </div>
  );
}
