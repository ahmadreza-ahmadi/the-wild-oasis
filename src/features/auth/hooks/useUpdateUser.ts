import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser as updateUserService } from '../services';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserService,
    onSuccess() {
      toast.success('Your data updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  return { updateUser, isUpdating };
}
