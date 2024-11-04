import getDutiesApi from '@/api/get-duties.api';
import getJobOpeningApi from '@/api/get-job-opening.api';
import CalendarPage from '@/components/calendar-page';

export default async function Page() {
  const jobOpenings = await getJobOpeningApi();
  const duties = await getDutiesApi();

  return <CalendarPage jobOpenings={jobOpenings} duties={duties} />;
}
