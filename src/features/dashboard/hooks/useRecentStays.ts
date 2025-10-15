import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router';
import { getStaysAfterDate } from '@/features/bookings/services';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDaysParam = searchParams.get('last');
  const numDays = numDaysParam ? +numDaysParam : 7;
  const queryDays = subDays(new Date(), numDays).toISOString();

  const query = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDays),
  });

  const confirmedStays = query.data
    ? query.data.filter((stay) =>
        ['checked-in', 'checked-out'].includes(stay.status)
      )
    : [];

  return { ...query, confirmedStays, numDays };
}
