import { createContext, useContext } from 'react';

export const CheckboxTreeContext = createContext<{
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

export function useCheckboxTree() {
  return useContext(CheckboxTreeContext);
}
