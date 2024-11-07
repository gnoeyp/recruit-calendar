'use client';

import { JobOpening } from '@/models/job-opening';
import useVisited from '@/hooks/use-visited';
import TinyBadge from './ui/tiny-badge';
import CalendarListItem from './ui/calendar-list-item';

type JobOpeningDisplayProps = {
  jobOpening: JobOpening;
  status?: 'starting' | 'ending';
  onClick?: () => void;
};

export default function JobOpeningListItem({
  jobOpening,
  status,
  onClick,
}: JobOpeningDisplayProps) {
  const [visitedIds, setVisitedIds] = useVisited();

  const visited = visitedIds.includes(jobOpening.id ?? '');

  const handleClick = () => {
    if (!visited && jobOpening.id != null) {
      setVisitedIds([...visitedIds, jobOpening.id]);
    }
    onClick?.();
  };

  return (
    <CalendarListItem onClick={handleClick} dimmed={visited}>
      <div className="flex items-center gap-1 text-sm w-full">
        {status === 'starting' && <TinyBadge variant="light">시</TinyBadge>}
        {status === 'ending' && <TinyBadge variant="dark">끝</TinyBadge>}
        <div className="flex-1 overflow-hidden text-nowrap">
          {jobOpening.companyName}
        </div>
      </div>
    </CalendarListItem>
  );
}
