import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { login as loginService } from '../services';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginService,

    onSuccess(data) {
      queryClient.setQueryData(['user'], data.user);
      toast.success('You logged in to your account successfully');
      navigate('/dashboard');
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn };
}
