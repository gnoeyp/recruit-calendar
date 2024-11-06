export const getCalendarDateList = (year: number, month: number) => {
  const date = new Date(year, month - 1, 1);

  while (date.getDay() !== 0) {
    date.setDate(date.getDate() - 1);
  }

  const dates: Date[] = [];

  while (true) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
    if (date.getMonth() === month % 12 && date.getDay() === 0) {
      break;
    }
  }
  return dates;
};
