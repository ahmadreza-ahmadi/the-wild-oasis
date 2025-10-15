import type { Tables } from '@/types/database';
import type { FilterOption } from '@/ui/Filter';
import type { BOOKING_STATUS_FILTER_OPTIONS } from './constants';
import type { getBookings } from './services';

export type Booking = Tables<'bookings'>;

export type BookingWithRelations = Awaited<
  ReturnType<typeof getBookings>
>['data'][number];

export type StatusFilterValue =
  (typeof BOOKING_STATUS_FILTER_OPTIONS)[number]['value'];

export interface StatusFilterOptions extends FilterOption {
  criteria: (status: Booking['status']) => boolean;
}
