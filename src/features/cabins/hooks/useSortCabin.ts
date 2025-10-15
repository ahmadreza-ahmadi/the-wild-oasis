import { useSearchParams } from 'react-router';
import { safeSort } from '@/utils';
import type { Cabin } from '../types';

export function useSortCabin(cabins: Cabin[]) {
  const [searchParams] = useSearchParams();

  function isKeyOfCabin(key: string): key is keyof Cabin {
    return !!cabins.length && key in cabins[0];
  }

  const sortByParam: keyof Cabin | (string & {}) | null =
    searchParams.get('sort-by');
  const sortOrderParam: 'asc' | 'desc' | (string & {}) =
    searchParams.get('sort-order') || 'asc';

  if (!sortByParam || !isKeyOfCabin(sortByParam)) return cabins;

  return safeSort(cabins, sortByParam, sortOrderParam);
}
