import { cva } from 'class-variance-authority';
import { useId } from 'react';

type ToggleBadgeProps = {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const toggleBadgeStyles = cva(
  'h-8 flex items-center justify-center px-4 rounded-full border cursor-pointer text-gray-400 w-max text-sm',
  {
    variants: {
      checked: {
        true: 'bg-sky-100 text-gray-500 border-sky-300',
        false: 'bg-white hover:bg-gray-100',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export default function ToggleBadge({
  children,
  checked,
  onChange,
}: ToggleBadgeProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={toggleBadgeStyles({ checked })}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange?.(!checked)}
        className="sr-only"
      />
      {children}
    </label>
  );
}
