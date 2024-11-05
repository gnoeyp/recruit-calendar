import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import MidLevelList from './mid-level-list';
import { useCheckboxTree } from './checkbox-tree-context';

vi.mock('./checkbox-tree-context', () => ({
  useCheckboxTree: vi.fn(),
}));

describe('MidLevelList', () => {
  const mockUseCheckboxTree = useCheckboxTree as Mock;

  const items = [
    {
      label: 'Item 1',
      value: 'item1',
      children: [
        { label: 'Child 1', value: 'child1' },
        { label: 'Child 2', value: 'child2' },
      ],
    },
    {
      label: 'Item 2',
      value: 'item2',
      children: [],
    },
  ];

  beforeEach(() => {
    mockUseCheckboxTree.mockReturnValue({
      checkedValues: [],
      onSelect: vi.fn(),
      onCheck: vi.fn(),
      leafMap: new Map([
        ['item1', ['child1', 'child2']],
        ['item2', []],
      ]),
    });
  });

  it('항목을 올바르게 렌더링합니다', () => {
    render(<MidLevelList items={items} level={0} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('항목 선택을 처리합니다', () => {
    const { onCheck } = mockUseCheckboxTree();
    render(<MidLevelList items={items} level={0} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Item 1/i }));
    expect(onCheck).toHaveBeenCalledWith('item1', true);

    fireEvent.click(screen.getByRole('checkbox', { name: /Item 2/i }));
    expect(onCheck).toHaveBeenCalledWith('item2', false);
  });

  it('자식 항목이 있는 항목을 선택하면 자식 항목을 표시합니다', () => {
    render(<MidLevelList items={items} level={0} />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('레벨 0에서 항목이 선택되지 않았을 때 메시지를 표시합니다', () => {
    render(<MidLevelList items={items} level={0} />);
    expect(screen.getByText('직무를 선택해주세요.')).toBeInTheDocument();
  });
});
