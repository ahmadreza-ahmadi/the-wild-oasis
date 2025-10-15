import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { duplicateCabin as duplicateCabinService } from '../services';

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDuplicating, mutate: duplicateCabin } = useMutation({
    mutationFn: duplicateCabinService,

    onSuccess: () => {
      toast.success('A duplication of the cabin was created successfully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isDuplicating, duplicateCabin };
}
