import { YearMonth } from '@/utils/year-month';
import { redirect } from 'next/navigation';

export default function Home() {
  const current = YearMonth.current();
  redirect(`/${current.year}-${current.month}`);
}
