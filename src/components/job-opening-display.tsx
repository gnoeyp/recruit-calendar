import { JobOpening } from '@/models/job-opening';
import TinyBadge from './ui/tiny-badge';

type JobOpeningDisplayProps = {
  jobOpening: JobOpening;
  status?: 'starting' | 'ending';
  onClick?: () => void;
};

export default function JobOpeningDisplay({
  jobOpening,
  status,
  onClick,
}: JobOpeningDisplayProps) {
  return (
    <div
      className="flex items-center gap-1 text-sm bg-white hover:bg-slate-100 cursor-pointer select-none px-2 py-0.5 w-full"
      onClick={onClick}
    >
      {status === 'starting' && <TinyBadge variant="light">시</TinyBadge>}
      {status === 'ending' && <TinyBadge variant="dark">끝</TinyBadge>}
      <div className="flex-1 overflow-hidden text-nowrap">
        {jobOpening.companyName}
      </div>
    </div>
  );
}
