import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import FinalLevelList from './final-level-list';
import { CheckboxTreeItem } from './checkbox-tree.types';
import { useCheckboxTree } from './checkbox-tree-context';

vi.mock('./checkbox-tree-context', () => ({
  useCheckboxTree: vi.fn(),
}));

describe('FinalLevelList', () => {
  const mockItems: CheckboxTreeItem[] = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
  ];

  const mockOnCheck = vi.fn();
  const mockCheckedValues = ['item1'];

  beforeEach(() => {
    (useCheckboxTree as Mock).mockReturnValue({
      checkedValues: mockCheckedValues,
      onCheck: mockOnCheck,
    });
  });

  it('목록을 렌더링합니다', () => {
    render(<FinalLevelList items={mockItems} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('checkedValues에 따라 올바른 항목을 체크합니다', () => {
    render(<FinalLevelList items={mockItems} />);

    const item1Checkbox = screen.getByLabelText('Item 1') as HTMLInputElement;
    const item2Checkbox = screen.getByLabelText('Item 2') as HTMLInputElement;

    expect(item1Checkbox.checked).toBe(true);
    expect(item2Checkbox.checked).toBe(false);
  });

  it('항목이 체크될 때 올바른 인수로 onCheck를 호출합니다', () => {
    render(<FinalLevelList items={mockItems} />);

    const item2Checkbox = screen.getByLabelText('Item 2') as HTMLInputElement;
    fireEvent.click(item2Checkbox);

    expect(mockOnCheck).toHaveBeenCalledWith('item2', true);
  });

  it('항목이 체크 해제될 때 올바른 인수로 onCheck를 호출합니다', () => {
    render(<FinalLevelList items={mockItems} />);

    const item1Checkbox = screen.getByLabelText('Item 1') as HTMLInputElement;
    fireEvent.click(item1Checkbox);

    expect(mockOnCheck).toHaveBeenCalledWith('item1', false);
  });
});
