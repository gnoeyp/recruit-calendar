import { findDeepestLevel, constructLeafMap } from './checkbox-tree.utils';
import { CheckboxTreeItem } from './checkbox-tree.types';
import { describe, expect, it } from 'vitest';

describe('CheckboxTree Utils', () => {
  describe('findDeepestLevel', () => {
    it('빈 트리에 대해 0을 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [];
      expect(findDeepestLevel(tree)).toBe(0);
    });

    it('루트 노드만 있는 트리에 대해 0을 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [
        { label: 'item1', value: '1', children: [] },
        { label: 'item2', value: '2', children: [] },
      ];
      expect(findDeepestLevel(tree)).toBe(0);
    });

    it('중첩된 트리에 대해 올바른 깊이를 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [
        {
          label: '1',
          value: '1',
          children: [
            {
              label: '1.1',
              value: '1.1',
              children: [
                { label: '1.1.1', value: '1.1.1', children: [] },
                { label: '1.1.2', value: '1.1.2', children: [] },
              ],
            },
          ],
        },
        { label: '2', value: '2', children: [] },
      ];
      expect(findDeepestLevel(tree)).toBe(2);
    });
  });

  describe('constructLeafMap', () => {
    it('빈 트리에 대해 빈 맵을 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [];
      const result = constructLeafMap(tree);
      expect(result.size).toBe(0);
    });

    it('단일 리프 노드가 있는 맵을 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [
        { label: '1', value: '1', children: [] },
        { label: '2', value: '2', children: [] },
      ];
      const result = constructLeafMap(tree);
      expect(result.get('1')).toEqual(['1']);
      expect(result.get('2')).toEqual(['2']);
    });

    it('중첩된 리프 노드가 있는 맵을 반환해야 한다', () => {
      const tree: CheckboxTreeItem[] = [
        {
          label: '1',
          value: '1',
          children: [
            {
              label: '1.1',
              value: '1.1',
              children: [
                { label: '1.1.1', value: '1.1.1', children: [] },
                { label: '1.1.2', value: '1.1.2', children: [] },
              ],
            },
          ],
        },
        { label: '2', value: '2', children: [] },
      ];
      const result = constructLeafMap(tree);
      expect(result.get('1')).toEqual(['1.1.1', '1.1.2']);
      expect(result.get('1.1')).toEqual(['1.1.1', '1.1.2']);
      expect(result.get('1.1.1')).toEqual(['1.1.1']);
      expect(result.get('1.1.2')).toEqual(['1.1.2']);
      expect(result.get('2')).toEqual(['2']);
    });
  });
});
