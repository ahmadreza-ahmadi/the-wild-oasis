import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { PAGINATION_PAGE_SIZE } from '@/constants/pagination';
import type { SortOrder } from '@/types/sort';
import {
  BOOKING_SORT_OPTIONS,
  BOOKING_STATUS_FILTER_OPTIONS,
} from '../constants';
import { getBookings } from '../services';
import type { BookingWithRelations, StatusFilterValue } from '../types';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const statusFilter: StatusFilterValue | (string & {}) =
    searchParams.get('status') || BOOKING_STATUS_FILTER_OPTIONS[0].value;

  const sortBy: keyof BookingWithRelations | (string & {}) =
    searchParams.get('sort-by') || BOOKING_SORT_OPTIONS[0].value;
  const sortOrder: SortOrder | (string & {}) =
    searchParams.get('sort-order') || BOOKING_SORT_OPTIONS[0].order;

  const pageParam = searchParams.get('page');
  const page = pageParam ? +pageParam : 1;

  const query = useQuery({
    queryKey: ['bookings', statusFilter, sortBy, sortOrder, page],
    queryFn: () =>
      getBookings({
        statusFilter,
        sortBy,
        sortOrder,
        page,
      }),
  });

  if (query.data?.count && query.data.count >= PAGINATION_PAGE_SIZE) {
    if (page < Math.ceil(query.data.count / PAGINATION_PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', statusFilter, sortBy, sortOrder, page + 1],
        queryFn: () =>
          getBookings({
            statusFilter,
            sortBy,
            sortOrder,
            page: page + 1,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', statusFilter, sortBy, sortOrder, page - 1],
        queryFn: () =>
          getBookings({
            statusFilter,
            sortBy,
            sortOrder,
            page: page - 1,
          }),
      });
    }
  }

  return query;
}
