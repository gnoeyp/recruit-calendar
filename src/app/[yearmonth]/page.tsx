import getDutiesApi from '@/api/get-duties.api';
import getJobOpeningApi from '@/api/get-job-opening.api';
import Calendar from '@/components/calendar';
import CheckboxTree from '@/components/checkbox-tree';
import { CheckboxTreeItem } from '@/components/checkbox-tree/checkbox-tree';
import { Duty } from '@/models/Duty';

export default async function Page() {
  const jobOpenings = await getJobOpeningApi();
  const duties = await getDutiesApi();

  const constructTree = (duties: Duty[]): CheckboxTreeItem[] =>
    duties.map((duty) => ({
      label: duty.name,
      value: duty.id,
      children: constructTree(duty.children),
    }));

  const items = constructTree(duties);

  return (
    <div>
      <div className="px-5 pt-3 pb-6 bg-gray-100">
        <CheckboxTree title="직무" items={items} />
      </div>
      <Calendar jobOpenings={jobOpenings} />
    </div>
  );
}
