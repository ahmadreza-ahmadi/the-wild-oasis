import { PAGINATION_PAGE_SIZE } from '@/constants/pagination';
import type {
  Booking,
  BookingWithRelations,
  StatusFilterValue,
} from '@/features/bookings/types';
import supabase from '@/services/supabase';
import type { SortOrder } from '@/types/sort';
import { getToday } from '@/utils';

function isValidBookingStatus(status: string): status is Booking['status'] {
  return ['checked-in', 'checked-out', 'unconfirmed'].includes(status);
}

export async function getBookings(options?: {
  statusFilter?: StatusFilterValue | (string & {});
  sortBy?: keyof Booking | (string & {});
  sortOrder?: SortOrder | (string & {});
  page?: number;
}) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)', { count: 'exact' });

  if (options?.statusFilter && isValidBookingStatus(options.statusFilter))
    query = query.eq('status', options.statusFilter);

  if (options?.sortBy)
    query = query.order(options.sortBy, {
      ascending: options.sortOrder === 'asc',
    });

  if (options?.page) {
    const from = (options.page - 1) * PAGINATION_PAGE_SIZE;
    const to = from + (PAGINATION_PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('An error occured while fetching bookings');
  }

  return { data, count };
}

export async function getBooking(id: BookingWithRelations['id']) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('createdAt, totalPrice, extrasPrice')
    .gte('createdAt', date)
    .lte('createdAt', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('createdAt');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(
  id: Booking['id'],
  changes: Partial<Omit<Booking, 'id'>>
) {
  const { error, data } = await supabase
    .from('bookings')
    .update(changes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  return data;
}

export async function deleteBooking(id: Booking['id']) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
