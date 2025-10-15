import Filter from '@/ui/Filter';
import SortBy from '@/ui/SortBy';
import TableOperations from '@/ui/TableOperations';
import {
  BOOKING_SORT_OPTIONS,
  BOOKING_STATUS_FILTER_OPTIONS,
} from '../constants';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter by="status" options={BOOKING_STATUS_FILTER_OPTIONS} />

      <SortBy options={BOOKING_SORT_OPTIONS} />
    </TableOperations>
  );
}

export default BookingTableOperations;
