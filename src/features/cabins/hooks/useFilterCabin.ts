import { useSearchParams } from 'react-router';
import { CABIN_DISCOUNT_FILTER_OPTIONS } from '../constants/filter';
import type { Cabin, DiscountFilterValue } from '../types';

export function useFilterCabin(cabins: Cabin[]) {
  const [searchParams] = useSearchParams();

  const discountFilterParam: DiscountFilterValue | (string & {}) | null =
    searchParams.get('discount');

  if (discountFilterParam)
    return cabins.filter(({ discount }) =>
      CABIN_DISCOUNT_FILTER_OPTIONS.find(
        ({ value }) => value === discountFilterParam
      )?.criteria(discount)
    );
  return cabins;
}
