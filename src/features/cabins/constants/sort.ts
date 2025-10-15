import type { SortOption } from '@/ui/SortBy';

export const CABIN_SORT_OPTIONS = [
  {
    value: 'name',
    order: 'asc',
    label: 'Sort by name (A-Z)',
  },
  {
    value: 'name',
    order: 'desc',
    label: 'Sort by name (Z-A)',
  },
  {
    value: 'regularPrice',
    order: 'asc',
    label: 'Sort by price (low-first)',
  },
  {
    value: 'regularPrice',
    order: 'desc',
    label: 'Sort by price (high-first)',
  },
  {
    value: 'maxCapacity',
    order: 'asc',
    label: 'Sort by capacity (low-first)',
  },
  {
    value: 'maxCapacity',
    order: 'desc',
    label: 'Sort by capacity (high-first)',
  },
] as const satisfies SortOption[];
