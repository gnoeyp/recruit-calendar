import { cn } from '@/utils/style';

type CalendarListItemProps = {
  onClick?: () => void;
  dimmed?: boolean;
  children?: React.ReactNode;
};

export default function CalendarListItem({
  children,
  onClick,
  dimmed,
}: CalendarListItemProps) {
  return (
    <div
      className={cn(
        'text-sm bg-white hover:bg-slate-100 cursor-pointer select-none px-2 py-0.5 w-ful',
        dimmed && 'opacity-30',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
