import type { SortOption } from '@/ui/SortBy';
import type { Booking, StatusFilterOptions } from './types';

export const STATUS_TAG_COLORS = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
} satisfies Record<Booking['status'], string>;

export const BOOKING_STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All', criteria: () => true },
  {
    value: 'checked-out',
    label: 'Checked out',
    criteria: (status) => status === 'checked-out',
  },
  {
    value: 'checked-in',
    label: 'Checked in',
    criteria: (status) => status === 'checked-in',
  },
  {
    value: 'unconfirmed',
    label: 'Unconfirmed',
    criteria: (status) => status === 'unconfirmed',
  },
] as const satisfies StatusFilterOptions[];

export const BOOKING_SORT_OPTIONS = [
  { value: 'startDate', label: 'Sort by date (recent first)', order: 'desc' },
  { value: 'startDate', label: 'Sort by date (earlier first)', order: 'asc' },
  {
    value: 'totalPrice',
    label: 'Sort by amount (high first)',
    order: 'desc',
  },
  { value: 'totalPrice', label: 'Sort by amount (low first)', order: 'asc' },
] as const satisfies SortOption[];
