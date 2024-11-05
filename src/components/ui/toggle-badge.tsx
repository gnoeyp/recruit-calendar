import classNames from 'classnames';
import { useId } from 'react';

type ToggleBadgeProps = {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function ToggleBadge({
  children,
  checked,
  onChange,
}: ToggleBadgeProps) {
  const id = useId();
  return (
    <div
      className={classNames(
        'h-8 flex items-center justify-center px-4 rounded-full border cursor-pointer text-gray-400 w-max text-sm',
        !checked && 'bg-white hover:bg-gray-100',
        checked && 'bg-sky-100 text-gray-500 border-sky-300',
      )}
      onClick={() => onChange?.(!checked)}
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      aria-labelledby={id}
    >
      <span id={id}>{children}</span>
    </div>
  );
}
