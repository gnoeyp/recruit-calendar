import classNames from 'classnames';

type MidLevelListItemProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  selected?: boolean;
  onSelect?: () => void;
  content?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
};

export default function MidLevelListItem({
  checked,
  onChange,
  selected,
  onSelect,
  content,
  extra,
  icon,
}: MidLevelListItemProps) {
  return (
    <div
      className={classNames(
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
      />
      <div className="flex-1 flex justify-between items-center">
        <div className="flex gap-1 items-center text-sm text-gray-600">
          {content}
          <div className="text-sky-400 text-xs">{extra}</div>
        </div>
        {icon}
      </div>
    </div>
  );
}
