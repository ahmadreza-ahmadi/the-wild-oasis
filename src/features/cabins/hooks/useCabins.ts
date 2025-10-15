import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services';
import { useFilterCabin } from './useFilterCabin';
import { useSortCabin } from './useSortCabin';

export function useCabins() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  const filteredCabins = useFilterCabin(cabins || []);
  const sortedCabins = useSortCabin(filteredCabins);

  return {
    cabins: cabins?.length ? sortedCabins : [],
    isLoading: isPending,
    error,
  };
}
