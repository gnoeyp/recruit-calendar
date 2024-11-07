import { useEffect, useState } from 'react';

const VISITED_KEY = 'visited';

type UseVisitedReturn = [string[], (visited: string[]) => void];

/**
 * localStorage에 저장된 방문한 ID 목록을 관리하는 커스텀 훅입니다.
 *
 * @returns
 * 방문한 ID 목록과 목록을 업데이트하는 함수를 포함하는 배열을 반환합니다.
 */
export default function useVisited(): UseVisitedReturn {
  const [visitedIds, setVisitedIds] = useState<string[]>([]);

  const setVisitedIdsWrapper = (visited: string[]) => {
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
    setVisitedIds(visited);
  };

  // SSR에서는 localStorage를 사용할 수 없으므로 useEffect를 사용하여 초기화합니다.
  useEffect(() => {
    setVisitedIds(JSON.parse(localStorage.getItem(VISITED_KEY) ?? '[]'));
  }, []);

  return [visitedIds, setVisitedIdsWrapper];
}
