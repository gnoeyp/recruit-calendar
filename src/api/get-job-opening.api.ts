import { JobOpening } from '@/models/job-opening';
import { JobOpeningDto } from './get-job-opening.dto';

export default async function getJobOpeningApi(): Promise<JobOpening[]> {
  const data = await fetch(
    'https://d1kh1cvi0j04lg.cloudfront.net/api/v1/recruits.json',
  );
  const dtos = (await data.json()) as JobOpeningDto[];
  return dtos.map((dto) => ({
    id: String(dto.id),
    companyName: dto.company_name,
    title: dto.title,
    startTime: new Date(dto.start_time),
    endTime: new Date(dto.end_time),
    imageUrl: dto.image_url,
    dutyIds: dto.duty_ids.map(String),
  }));
}
