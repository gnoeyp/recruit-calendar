import { useCallback, useMemo } from 'react';
import BadgeCheckbox from '../badge-checkbox';
import { CheckboxTreeItem } from './checkbox-tree';
import useCheckboxTree from './use-checkbox-tree';

type BadgeListProps = {
  items: CheckboxTreeItem[];
};

export default function BadgeList({ items }: BadgeListProps) {
  const { checkedValues, onCheck } = useCheckboxTree();
  const isChecked = useCallback(
    (value: string): boolean => checkedValues.includes(value),
    [checkedValues],
  );

  const treeItems = useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        value: item.value,
        checked: isChecked(item.value),
      })),
    [items, isChecked],
  );

  return (
    <div className="flex-1 px-6 py-4 bg-white">
      <div className="flex flex-wrap gap-2 w-full h-max">
        {treeItems.map((item) => (
          <BadgeCheckbox
            key={item.value}
            checked={item.checked}
            onChange={(checked) => onCheck(item.value, checked)}
          >
            {item.label}
          </BadgeCheckbox>
        ))}
      </div>
    </div>
  );
}
