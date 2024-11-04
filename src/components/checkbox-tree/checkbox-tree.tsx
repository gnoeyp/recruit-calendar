'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import CheckboxTreeNode from './checkbox-tree-node';

export type CheckboxTreeItem = {
  label: string;
  value: string;
  children?: CheckboxTreeItem[];
};

const findDeepestLevel = (tree: CheckboxTreeItem[]): number => {
  return tree.reduce((result, node) => {
    if (!node.children || node.children.length === 0) {
      return result;
    }
    return Math.max(result, findDeepestLevel(node.children) + 1);
  }, 0);
};

const constructLeafMap = (tree: CheckboxTreeItem[], deepest: number) => {
  const result = new Map<string, string[]>();
  const findFinalLevelValues = (
    node: CheckboxTreeItem,
    level: number,
  ): string[] => {
    if (!node.children || node.children.length === 0) {
      result.set(node.value, [node.value]);
      return [node.value];
    }
    const values =
      node.children?.flatMap((child) =>
        findFinalLevelValues(child, level + 1),
      ) ?? [];
    result.set(node.value, values);
    return values;
  };

  tree.forEach((node) => {
    findFinalLevelValues(node, 0);
  });
  return result;
};

export const CheckboxTreeData = createContext<{
  checkedValues: string[];
  deepest: number;
  onCheck: (value: string, checked: boolean) => void;
  leafMap: Map<string, string[]>;
}>({
  checkedValues: [],
  deepest: 0,
  onCheck: () => {},
  leafMap: new Map(),
});

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
  const leafMap = useMemo(() => constructLeafMap(items, deepest), [items]);

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    onChange?.(checkedValues);
  }, [checkedValues]);

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
    <CheckboxTreeData.Provider
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
    </CheckboxTreeData.Provider>
  );
}
