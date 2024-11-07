import { useEffect, useState } from 'react';

const VISITED_KEY = 'visited';

type UseVisitedReturn = [string[], (visited: string[]) => void];

export default function useVisited(): UseVisitedReturn {
  const [visitedIds, setVisitedIds] = useState<string[]>(() => {
    const storedVisited = localStorage.getItem(VISITED_KEY);
    return storedVisited ? JSON.parse(storedVisited) : [];
  });

  useEffect(() => {
    localStorage.setItem(VISITED_KEY, JSON.stringify(visitedIds));
  }, [visitedIds]);

  return [visitedIds, setVisitedIds];
}
