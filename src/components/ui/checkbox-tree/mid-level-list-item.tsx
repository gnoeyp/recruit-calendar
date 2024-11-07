import { cn } from '@/utils/style';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

type MidLevelListItemProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  selected?: boolean;
  onSelect?: () => void;
  content?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
};

const midLevelListItemStyles = cva(
  'flex gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 max-w-64 w-full',
);

export default function MidLevelListItem({
  checked,
  onChange,
  selected,
  onSelect,
  content,
  extra,
  icon,
}: MidLevelListItemProps) {
  const id = useId();
  return (
    <div
      className={cn(
        'flex gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 max-w-64 w-full',
        selected && 'bg-gray-50',
      )}
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="cursor-pointer"
        aria-labelledby={id}
      />
      <div className="flex-1 flex justify-between items-center">
        <div className="flex gap-1 items-center text-sm text-gray-600">
          <label id={id} className="cursor-pointer">
            {content}
          </label>
          <div className="text-sky-400 text-xs">{extra}</div>
        </div>
        {icon}
      </div>
    </div>
  );
}
