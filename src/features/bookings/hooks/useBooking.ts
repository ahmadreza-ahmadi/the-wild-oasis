import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getBooking } from '../services';

export function useBooking() {
  const { bookingId } = useParams();

  return useQuery({
    queryKey: ['booking', bookingId && +bookingId],
    queryFn: () => getBooking(bookingId ? +bookingId : 0),
  });
}
