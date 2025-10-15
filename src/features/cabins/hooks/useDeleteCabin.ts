import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinService } from '../services';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinService,

    onSuccess: () => {
      toast.success('The cabin was deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
