import CalendarCell from './calendar-cell';

type CalendarItem = {
  key: string;
  header: React.ReactNode;
  content: React.ReactNode;
};

type CalendarProps = {
  items: CalendarItem[];
};

export default function Calendar({ items }: CalendarProps) {
  return (
    <div className="grid grid-cols-7 w-full">
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        SUN
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        MON
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        TUE
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        WED
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        THR
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        FRI
      </div>
      <div className="sticky top-0 bg-gray-200 flex items-center justify-center z-10">
        SAT
      </div>
      {items.map((item) => (
        <CalendarCell
          key={item.key}
          header={item.header}
          content={item.content}
        />
      ))}
    </div>
  );
}
