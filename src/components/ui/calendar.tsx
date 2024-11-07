import { useEffect, useMemo, useRef, useState } from 'react';

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

  const [topIndex, setTopIndex] = useState(0);
  const headers = topIndex < weeks.length ? weeks[topIndex] : [];

  const topRef = useRef<HTMLDivElement>(null);

  // XXX:
  // - 직접적인 DOM 조작. 개선 여지 있을지 고민해보기
  // - HEADER_HEIGHT 계산 방법 있는지
  useEffect(() => {
    const eventListener = () => {
      const topElement = topRef.current?.children[topIndex];
      const topOffset = topElement?.getBoundingClientRect().top ?? 0;
      if (topOffset > HEADER_HEIGHT && topIndex > 0) {
        setTopIndex(topIndex - 1);
      }

      const secondTopElement = topRef.current?.children[topIndex + 1];
      const secondTopOffset =
        secondTopElement?.getBoundingClientRect().top ?? 0;
      if (secondTopOffset < HEADER_HEIGHT && topIndex < weeks.length - 1) {
        setTopIndex(topIndex + 1);
      }
    };
    window.addEventListener('scroll', eventListener);
    return () => {
      window.removeEventListener('scroll', eventListener);
    };
  }, [topIndex]);

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
      <div ref={topRef}>
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
