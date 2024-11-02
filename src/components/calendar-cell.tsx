type CalendarCellProps = {
  header?: React.ReactNode;
  content?: React.ReactNode;
};

export default function CalendarCell({ header, content }: CalendarCellProps) {
  return (
    <div>
      <div className="sticky top-5 shadow-md bg-white">{header}</div>
      {content}
    </div>
  );
}
