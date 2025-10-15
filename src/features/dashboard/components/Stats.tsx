import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import type {
  getBookingsAfterDate,
  getStaysAfterDate,
} from '@/features/bookings/services';
import { formatCurrency } from '@/utils';
import Stat from './Stat';

interface StatsProps {
  bookings: Awaited<ReturnType<typeof getBookingsAfterDate>>;
  confirmedStays: Awaited<ReturnType<typeof getStaysAfterDate>>;
  numDays: number;
  cabinsCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinsCount }: StatsProps) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays.length;
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const occupancyRate = occupation / (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
