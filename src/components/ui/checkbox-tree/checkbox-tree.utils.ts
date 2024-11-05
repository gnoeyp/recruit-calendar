import { CheckboxTreeItem } from './checkbox-tree.types';

const _isLeaf = (node: CheckboxTreeItem): boolean =>
  !node.children || node.children.length === 0;

export const findDeepestLevel = (tree: CheckboxTreeItem[]): number => {
  return tree.reduce((result, node) => {
    if (_isLeaf(node)) {
      return result;
    }
    return Math.max(result, findDeepestLevel(node.children ?? []) + 1);
  }, 0);
};

export const constructLeafMap = (tree: CheckboxTreeItem[]) => {
  const result = new Map<string, string[]>();

  const _findLeafValues = (node: CheckboxTreeItem, level: number): string[] => {
    if (_isLeaf(node)) {
      result.set(node.value, [node.value]);
      return [node.value];
    }
    const values =
      node.children?.flatMap((child) => _findLeafValues(child, level + 1)) ??
      [];
    result.set(node.value, values);
    return values;
  };

  tree.forEach((node) => _findLeafValues(node, 0));
  return result;
};
