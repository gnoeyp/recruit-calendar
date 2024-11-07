import { useEffect, useState } from 'react';

type UseVisitedReturn = [string[], (visited: string[]) => void];

/**
 * localStorage에 저장된 방문한 ID 목록을 관리하는 커스텀 훅입니다.
 *
 * @remarks
 * 여러 곳에서 같은 키를 사용하면 기대한 대로 작동하지 않을 수 있습니다.
 *
 * @returns
 * 방문한 ID 목록과 목록을 업데이트하는 함수를 포함하는 배열을 반환합니다.
 */
export default function useVisited(localStorageKey: string): UseVisitedReturn {
  const [visitedIds, setVisitedIds] = useState<string[]>([]);

  const setVisitedIdsWrapper = (visited: string[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(visited));
    setVisitedIds(visited);
  };

  // SSR에서는 localStorage를 사용할 수 없으므로 useEffect를 사용하여 초기화합니다.
  useEffect(() => {
    setVisitedIds(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]'));
  }, []);

  return [visitedIds, setVisitedIdsWrapper];
}
