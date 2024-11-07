import { renderHook, act } from '@testing-library/react';
import useVisited from './use-visited';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useVisited', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('localStorage가 비어있으면 빈 배열로 초기화되어야 한다', () => {
    const { result } = renderHook(() => useVisited());
    const [visitedIds] = result.current;
    expect(visitedIds).toEqual([]);
  });

  it('localStorage에 값이 있으면 해당 값으로 초기화되어야 한다', () => {
    localStorage.setItem('visited', JSON.stringify(['id1', 'id2']));
    const { result } = renderHook(() => useVisited());
    const [visitedIds] = result.current;
    expect(visitedIds).toEqual(['id1', 'id2']);
  });

  it('visitedIds가 변경되면 localStorage가 업데이트되어야 한다', () => {
    const { result } = renderHook(() => useVisited());
    const [, setVisitedIds] = result.current;

    act(() => {
      setVisitedIds(['id1', 'id2']);
    });

    expect(localStorage.getItem('visited')).toEqual(
      JSON.stringify(['id1', 'id2']),
    );
  });

  it('visitedIds 상태가 업데이트되어야 한다', () => {
    const { result } = renderHook(() => useVisited());
    const [, setVisitedIds] = result.current;

    act(() => {
      setVisitedIds(['id1', 'id2']);
    });

    const [visitedIds] = result.current;
    expect(visitedIds).toEqual(['id1', 'id2']);
  });
});
