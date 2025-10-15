import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingService } from '../services';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingService,
    onSuccess: () => {
      toast.success('The setting was updated successfully.');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateSetting };
}
