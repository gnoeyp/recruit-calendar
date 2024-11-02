import { JobOpeningDto } from '@/api/get-job-opening.dto';

export type JobOpening = {
  id?: string;
  companyName?: string;
  title?: string;
  startTime?: Date;
  endTime?: Date;
  imageUrl?: string;
  dutyIds?: string[];
};
