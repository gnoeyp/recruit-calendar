import { JobOpening } from '@/models/job-opening';
import Badge from './badge';

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
      {status === 'starting' && <Badge type="light">시</Badge>}
      {status === 'ending' && <Badge type="dark">끝</Badge>}
      <div className="flex-1">{jobOpening.companyName}</div>
    </div>
  );
}
