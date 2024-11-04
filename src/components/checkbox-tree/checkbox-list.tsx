import { useCallback, useMemo, useState } from 'react';
import useCheckboxTree from './use-checkbox-tree';
import { CheckboxTreeItem } from './checkbox-tree';
import CheckboxTreeNode from './checkbox-tree-node';
import CheckboxListItem from './checkbox-list-item';
import { FaAngleRight } from 'react-icons/fa6';

type CheckboxListProps = {
  items: CheckboxTreeItem[];
  level: number;
};
export default function CheckboxList({ items, level }: CheckboxListProps) {
  const { checkedValues, onCheck, leafMap } = useCheckboxTree();

  const [selected, setSelected] = useState<string>();

  const selectedItem = items.find((item) => item.value === selected);

  const isChecked = useCallback(
    (value: string): boolean =>
      !!leafMap.get(value)?.every((v) => checkedValues.includes(v)),
    [leafMap, checkedValues],
  );

  const isSelected = useCallback(
    (value: string): boolean => selected === value,
    [selected],
  );

  const calculateCount = useCallback(
    (value: string) => {
      const common = leafMap
        .get(value)
        ?.filter((v) => checkedValues.includes(v));
      return common?.length ?? 0;
    },
    [leafMap, checkedValues],
  );

  const treeItems = useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        value: item.value,
        count: calculateCount(item.value),
        checked: isChecked(item.value),
        selected: isSelected(item.value),
        hasChildren: item.children && item.children.length > 0,
      })),
    [items, isChecked, isSelected],
  );

  return (
    <>
      <div className="flex flex-col min-w-64 w-64 h-full py-1 overflow-y-scroll bg-white">
        {treeItems.map((item) => (
          <CheckboxListItem
            key={item.value}
            checked={item.checked}
            onChange={(checked) => onCheck(item.value, checked)}
            selected={item.selected}
            onSelect={() => {
              setSelected(item.value);
              if (!item.hasChildren) {
                onCheck(item.value, !item.checked);
              }
            }}
            content={item.label}
            extra={item.count > 0 ? item.count : undefined}
            icon={item.hasChildren && <FaAngleRight size={12} color="#888" />}
          />
        ))}
      </div>
      {selectedItem && selectedItem.children && (
        <CheckboxTreeNode items={selectedItem.children} level={level + 1} />
      )}
      {level === 0 && selectedItem === undefined && (
        <div className="flex items-center justify-center flex-1 text-gray-400 text-sm">
          직무를 선택해주세요.
        </div>
      )}
    </>
  );
}
