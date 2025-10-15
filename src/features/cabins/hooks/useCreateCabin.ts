import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin as createCabinService } from '../services';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinService,

    onSuccess: () => {
      toast.success('The cabin was created successfully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
