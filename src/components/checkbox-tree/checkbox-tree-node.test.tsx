import { render } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import CheckboxTreeNode from './checkbox-tree-node';
import { useCheckboxTree } from './checkbox-tree-context';

vi.mock('./checkbox-tree-context', () => ({
  useCheckboxTree: vi.fn(),
}));

vi.mock('./final-level-list', () => ({
  default: vi.fn(() => <div>FinalLevelList</div>),
}));

vi.mock('./mid-level-list', () => ({
  default: vi.fn(() => <div>MidLevelList</div>),
}));

describe('CheckboxTreeNode', () => {
  it('가장 깊은 레벨일 떄 FinalLevelList를 렌더링한다', () => {
    (useCheckboxTree as Mock).mockReturnValue({ deepest: 2 });
    const items = [{ label: 'Item 1', value: 'item1' }];
    const { getByText } = render(<CheckboxTreeNode items={items} level={2} />);
    expect(getByText('FinalLevelList')).toBeInTheDocument();
  });

  it('가장 깊은 레벨이 아닐 때 MidLevelList를 렌더링한다', () => {
    (useCheckboxTree as Mock).mockReturnValue({ deepest: 2 });
    const items = [{ label: 'Item 1', value: 'item1' }];
    const { getByText } = render(<CheckboxTreeNode items={items} level={1} />);
    expect(getByText('MidLevelList')).toBeInTheDocument();
  });
});
