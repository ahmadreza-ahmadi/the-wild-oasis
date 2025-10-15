import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editCabin as editCabinService } from '../services';
import type { Cabin, CabinChanges } from '../types';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ changes, id }: { id: Cabin['id']; changes: CabinChanges }) =>
      editCabinService(id, changes),

    onSuccess: () => {
      toast.success('The cabin was edited successfully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { isEditing, editCabin };
}
