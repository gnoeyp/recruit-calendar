import BadgeList from './badge-list';
import CheckboxList from './checkbox-list';
import { CheckboxTreeItem } from './checkbox-tree';
import useCheckboxTree from './use-checkbox-tree';

type CheckboxTreeNodeProps = {
  items: CheckboxTreeItem[];
  level: number;
};

export default function CheckboxTreeNode({
  items,
  level,
}: CheckboxTreeNodeProps) {
  const { deepest } = useCheckboxTree();
  if (level === deepest) return <BadgeList items={items} />;
  return <CheckboxList items={items} level={level} />;
}
