'use client';

import { Duty } from '@/models/Duty';
import { JobOpening } from '@/models/job-opening';
import { useState } from 'react';
import CheckboxTree, { CheckboxTreeItem } from './checkbox-tree/checkbox-tree';
import Calendar from './calendar';

type CalendarPageProps = {
  jobOpenings: JobOpening[];
  duties: Duty[];
};

export default function CalendarPage({
  jobOpenings,
  duties,
}: CalendarPageProps) {
  const [dutyIds, setDutyIds] = useState<string[]>([]);

  const constructTree = (duties: Duty[]): CheckboxTreeItem[] =>
    duties.map((duty) => ({
      label: duty.name,
      value: duty.id,
      children: constructTree(duty.children),
    }));

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
        <CheckboxTree title="직무" items={items} onChange={setDutyIds} />
      </div>
      <Calendar jobOpenings={filteredJobOpenings} />
    </div>
  );
}
