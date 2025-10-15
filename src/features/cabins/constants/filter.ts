import type { DiscountFilterOptions } from '../types';

export const CABIN_DISCOUNT_FILTER_OPTIONS = [
  {
    value: 'all',
    label: 'All',
    criteria: () => true,
  },
  {
    value: 'no-discount',
    label: 'No discount',
    criteria: (discount) => discount === 0,
  },
  {
    value: 'with-discount',
    label: 'With discount',
    criteria: (discount) => discount > 0,
  },
] as const satisfies DiscountFilterOptions[];
