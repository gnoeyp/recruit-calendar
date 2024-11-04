import { useContext } from 'react';
import { CheckboxTreeData } from './checkbox-tree';

export default function useCheckboxTree() {
  return useContext(CheckboxTreeData);
}
