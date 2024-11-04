import { useMemo } from 'react';
import BadgeCheckbox from '../badge-checkbox';
import { CheckboxTreeItem } from './checkbox-tree.types';
import { useCheckboxTree } from './checkbox-tree-context';

type BadgeListProps = {
  items: CheckboxTreeItem[];
};

export default function FinalLevelList({ items }: BadgeListProps) {
  const { checkedValues, onCheck } = useCheckboxTree();

  const treeItems = useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        value: item.value,
        checked: checkedValues.includes(item.value),
      })),
    [items, checkedValues],
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
