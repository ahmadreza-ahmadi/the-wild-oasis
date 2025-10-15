import Empty from '@/ui/Empty';
import Menus from '@/ui/Menus';
import Pagination from '@/ui/Pagination';
import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import { useBookings } from '../hooks/useBookings';
import type { BookingWithRelations } from '../types';
import BookingRow from './BookingRow';

function BookingTable() {
  const { data, error, isPending } = useBookings();

  if (isPending) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  if (!data?.data.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table gridTemplateColumns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={data.data}
          renderRow={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking as BookingWithRelations}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={data.count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
