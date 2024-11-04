import classNames from 'classnames';

type TinyBadgeProps = {
  type?: 'light' | 'dark';
  blur?: boolean;
  children?: React.ReactNode;
};

export default function TinyBadge({
  type = 'light',
  children,
}: TinyBadgeProps) {
  return (
    <div
      className={classNames(
        'w-4 h-4 inline-flex items-center justify-center rounded-md text-white text-xs',
        { 'bg-orange-500': type === 'light', 'bg-cyan-800': type === 'dark' },
      )}
    >
      {children}
    </div>
  );
}
