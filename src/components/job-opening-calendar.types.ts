import { JobOpening } from '@/models/job-opening';

export enum JobOpeningStatus {
  STARTING = 'starting',
  ENDING = 'ending',
}

export type JobOpeningCalendarItem = {
  jobOpening: JobOpening;
  date: Date;
  status: JobOpeningStatus;
  visited: boolean;
};
