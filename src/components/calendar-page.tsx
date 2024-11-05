'use client';

import { Duty } from '@/models/Duty';
import { JobOpening } from '@/models/job-opening';
import { useState } from 'react';
import JobOpeningCalendar from './job-opening-calendar';
import CheckboxTree, { CheckboxTreeItem } from './ui/checkbox-tree';

const TITLE = '직무';

type CalendarPageProps = {
  jobOpenings: JobOpening[];
  duties: Duty[];
};

const constructTree = (duties: Duty[]): CheckboxTreeItem[] =>
  duties.map((duty) => ({
    label: duty.name,
    value: duty.id,
    children: constructTree(duty.children),
  }));

export default function CalendarPage({
  jobOpenings,
  duties,
}: CalendarPageProps) {
  const [dutyIds, setDutyIds] = useState<string[]>([]);

  const items = constructTree(duties);

  const filteredJobOpenings =
    dutyIds.length === 0
      ? jobOpenings
      : jobOpenings.filter((jobOpening) =>
          jobOpening.dutyIds?.some((id) => dutyIds.includes(id)),
        );

  return (
    <div>
      <div className="px-5 pt-3 pb-6 bg-gray-100">
        <CheckboxTree title={TITLE} items={items} onChange={setDutyIds} />
      </div>
      <JobOpeningCalendar jobOpenings={filteredJobOpenings} />
    </div>
  );
}
