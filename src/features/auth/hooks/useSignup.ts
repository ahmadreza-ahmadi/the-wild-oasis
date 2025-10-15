import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupService } from '../services';

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupService,
    onSuccess() {
      toast.success(
        "Account was successfully created! Please verify the new account from the user's email address"
      );
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { signup, isSigningUp };
}
