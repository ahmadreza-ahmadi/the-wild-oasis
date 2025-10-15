import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '@/features/bookings/services';

export function useTodayActivity() {
  return useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });
}
