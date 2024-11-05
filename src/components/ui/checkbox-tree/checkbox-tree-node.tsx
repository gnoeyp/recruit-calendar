import FinalLevelList from './final-level-list';
import MidLevelList from './mid-level-list';
import { useCheckboxTree } from './checkbox-tree-context';
import { CheckboxTreeItem } from './checkbox-tree.types';

type CheckboxTreeNodeProps = {
  items: CheckboxTreeItem[];
  level: number;
};

export default function CheckboxTreeNode({
  items,
  level,
}: CheckboxTreeNodeProps) {
  const { deepest } = useCheckboxTree();
  if (level === deepest) return <FinalLevelList items={items} />;
  return <MidLevelList items={items} level={level} />;
}
