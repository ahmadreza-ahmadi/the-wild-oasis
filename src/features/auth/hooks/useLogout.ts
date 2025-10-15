import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { logout as logoutService } from '../services';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutService,
    onSuccess() {
      navigate('/login', { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isLoggingOut };
}
