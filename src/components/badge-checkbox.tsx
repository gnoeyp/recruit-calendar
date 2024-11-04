import classNames from 'classnames';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

type BadgeCheckboxProps = {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function BadgeCheckbox({
  children,
  checked,
  onChange,
}: BadgeCheckboxProps) {
  const id = useMemo(() => uuidv4(), []);
  return (
    <div
      className={classNames(
        'bg-white h-8 flex items-center justify-center  px-4 rounded-full border cursor-pointer text-gray-400 w-max text-sm',
        !checked && 'hover:bg-gray-100',
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
