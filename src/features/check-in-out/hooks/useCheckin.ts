import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { updateBooking } from '@/features/bookings/services';
import type { Booking } from '@/features/bookings/types';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: Booking['id'];
      breakfast?: Pick<Booking, 'extrasPrice' | 'hasBreakfast' | 'totalPrice'>;
    }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: 'checked-in',
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked in successfully`);
      queryClient.invalidateQueries({
        type: 'active',
      });
      navigate('/');
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isCheckingIn, checkin };
}
