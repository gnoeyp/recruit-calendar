import { Duty } from '@/models/duty';
import { DutyDto } from './get-duties.dto';

const hasParent = (duty: DutyDto): boolean => {
  return duty.parent_id !== null;
};

function generateDutyTree(dtos: DutyDto[]): Duty[] {
  const duties: Duty[] = [];
  const dutyMap = new Map<number, Duty>();
  for (const dto of dtos) {
    const duty: Duty = {
      id: String(dto.id),
      name: dto.name,
      children: [],
    };
    dutyMap.set(dto.id, duty);
  }
  for (const dto of dtos) {
    const duty = dutyMap.get(dto.id);
    if (!duty) {
      console.error(`Duty with id ${dto.id} not found`);
      continue;
    }
    if (!hasParent(dto)) {
      duties.push(duty);
    } else {
      const parent = dutyMap.get(dto.parent_id);
      if (parent) {
        parent.children.push(duty);
      }
    }
  }
  return duties;
}

export default async function getDutiesApi(): Promise<Duty[]> {
  const data = await fetch(
    'https://d1kh1cvi0j04lg.cloudfront.net/api/v1/duties.json',
  );
  const dtos = (await data.json()) as DutyDto[];
  return generateDutyTree(dtos);
}
