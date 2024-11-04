import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CheckboxTree from './checkbox-tree';
import { CheckboxTreeItem } from './checkbox-tree.types';

const items: CheckboxTreeItem[] = [
  {
    value: '1',
    label: 'Item 1',
    children: [
      {
        value: '1-1',
        label: 'Item 1-1',
      },
      {
        value: '1-2',
        label: 'Item 1-2',
      },
    ],
  },
  {
    value: '2',
    label: 'Item 2',
    children: [
      {
        value: '2-1',
        label: 'Item 2-1',
      },
    ],
  },
];

describe('CheckboxTree', () => {
  it('제목을 렌더링합니다', () => {
    render(<CheckboxTree title="Test Title" items={items} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('올바른 수의 체크박스를 렌더링합니다', () => {
    render(<CheckboxTree items={items} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('체크박스를 체크할 때 체크된 값을 업데이트합니다', () => {
    const handleChange = vi.fn();
    render(<CheckboxTree items={items} onChange={handleChange} />);

    const checkbox = screen.getByLabelText('Item 1');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(['1-1', '1-2']);
  });

  it('체크박스를 체크 해제할 때 체크된 값을 업데이트합니다', () => {
    const handleChange = vi.fn();
    render(<CheckboxTree items={items} onChange={handleChange} />);

    const checkbox = screen.getByLabelText('Item 1');
    fireEvent.click(checkbox); // 체크
    fireEvent.click(checkbox); // 체크 해제

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('체크된 항목의 총 개수를 올바르게 표시합니다', () => {
    render(<CheckboxTree items={items} />);
    expect(screen.getByTitle('Count')).toHaveTextContent('0');

    const checkbox = screen.getByLabelText('Item 1');
    fireEvent.click(checkbox);

    expect(screen.getByTitle('Count')).toHaveTextContent('2');
  });
});
