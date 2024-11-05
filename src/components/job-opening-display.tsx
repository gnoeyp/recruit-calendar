import { JobOpening } from '@/models/job-opening';
import TinyBadge from './ui/tiny-badge';

type JobOpeningDisplayProps = {
  jobOpening: JobOpening;
  status?: 'starting' | 'ending';
};

export default function JobOpeningDisplay({
  jobOpening,
  status,
}: JobOpeningDisplayProps) {
  return (
    <div className="flex items-center gap-1 text-sm bg-white hover:bg-slate-100 cursor-pointer select-none">
      {status === 'starting' && <TinyBadge type="light">시</TinyBadge>}
      {status === 'ending' && <TinyBadge type="dark">끝</TinyBadge>}
      <div className="flex-1">{jobOpening.companyName}</div>
    </div>
  );
}
