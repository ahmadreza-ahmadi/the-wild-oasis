import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '@/features/bookings/services';
import type { Booking } from '@/features/bookings/types';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId: Booking['id']) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked out successfully`);
      queryClient.invalidateQueries({
        type: 'active',
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isCheckingOut, checkout };
}
