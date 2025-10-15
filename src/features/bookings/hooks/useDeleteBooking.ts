import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingService } from '../services';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingService,

    onSuccess: () => {
      toast.success('The booking was deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
