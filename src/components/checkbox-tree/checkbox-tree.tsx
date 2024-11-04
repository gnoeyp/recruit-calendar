'use client';

import { useEffect, useMemo, useState } from 'react';
import CheckboxTreeNode from './checkbox-tree-node';
import { CheckboxTreeContext } from './checkbox-tree-context';
import { CheckboxTreeItem } from './checkbox-tree.types';
import { constructLeafMap, findDeepestLevel } from './checkbox-tree.utils';

type CheckboxTreeProps = {
  items: CheckboxTreeItem[];
  title?: React.ReactNode;
  onChange?: (values: string[]) => void;
};

export default function CheckboxTree({
  title,
  items,
  onChange,
}: CheckboxTreeProps) {
  const deepest = useMemo(() => findDeepestLevel(items), [items]);
  const leafMap = useMemo(() => constructLeafMap(items), [items]);

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    onChange?.(checkedValues);
  }, [checkedValues, onChange]);

  const handleCheck = (value: string, checked: boolean) => {
    const finalLevelValues = leafMap.get(value);
    if (checked) {
      setCheckedValues(
        Array.from(new Set([...checkedValues, ...(finalLevelValues ?? [])])),
      );
    } else {
      setCheckedValues(
        checkedValues.filter((v) => !finalLevelValues?.includes(v)),
      );
    }
  };

  const totalCount = checkedValues.length;

  return (
    <CheckboxTreeContext.Provider
      value={{
        checkedValues,
        deepest,
        onCheck: handleCheck,
        leafMap,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg">{title}</h3>{' '}
          <span className="text-sky-500">{totalCount}</span>
        </div>
        <div className="flex border rounded-xl w-3/4 h-72 overflow-hidden">
          <CheckboxTreeNode items={items} level={0} />
        </div>
      </div>
    </CheckboxTreeContext.Provider>
  );
}
