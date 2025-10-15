import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router';
import { getBookingsAfterDate } from '@/features/bookings/services';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDaysParam = searchParams.get('last');
  const numDays = numDaysParam ? +numDaysParam : 7;
  const queryDays = subDays(new Date(), numDays).toISOString();

  return useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDays),
  });
}
