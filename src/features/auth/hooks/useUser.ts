import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services';

export function useUser() {
  const { isPending: isLoadingUser, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoadingUser,
    isAuthenticated: user?.role === 'authenticated',
  };
}
