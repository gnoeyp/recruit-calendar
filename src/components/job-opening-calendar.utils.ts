import { JobOpening } from '@/models/job-opening';
import { areSameDates } from '@/utils/are-same-dates';
import { dateKey } from '@/utils/date-key';
import {
  JobOpeningCalendarItem,
  JobOpeningStatus,
} from './job-opening-calendar.types';

export const getCalendarItems = (
  jobOpenings: JobOpening[],
  visitedIds: string[],
) => {
  const startingItems = jobOpenings.map((item) => ({
    jobOpening: item,
    date: item.startTime,
    status: JobOpeningStatus.STARTING,
    visited: item.id != null && visitedIds.includes(item.id),
  }));

  const endingItems = jobOpenings.map((item) => ({
    jobOpening: item,
    date: item.endTime,
    status: JobOpeningStatus.ENDING,
    visited: item.id != null && visitedIds.includes(item.id),
  }));

  return [...startingItems, ...endingItems].sort((a, b) => {
    if (areSameDates(a.date, b.date)) {
      return a.status === JobOpeningStatus.STARTING ? -1 : 1;
    }
    return a.date.getTime() - b.date.getTime();
  });
};

export const groupItemsByDate = (calendarItems: JobOpeningCalendarItem[]) => {
  const result = new Map<string, JobOpeningCalendarItem[]>();
  calendarItems.forEach((item) => {
    const { date } = item;
    const key = dateKey(date);
    if (!result.has(key)) {
      result.set(key, []);
    }
    result.get(key)?.push(item);
  });
  return result;
};
