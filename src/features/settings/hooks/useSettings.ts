import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../services';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
}
