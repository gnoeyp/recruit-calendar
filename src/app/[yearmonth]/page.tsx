import getJobOpeningApi from '@/api/get-job-opening.api';
import Calendar from '@/components/calendar';

export default async function Page() {
  const jobOpenings = await getJobOpeningApi();
  return <Calendar jobOpenings={jobOpenings} />;
}
