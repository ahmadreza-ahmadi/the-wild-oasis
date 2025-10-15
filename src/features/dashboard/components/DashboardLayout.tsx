import styled from 'styled-components';
import { useCabins } from '@/features/cabins/hooks/useCabins';
import TodayActivity from '@/features/check-in-out/components/TodayActivity';
import Spinner from '@/ui/Spinner';
import { useRecentBookings } from '../hooks/useRecentBookings';
import { useRecentStays } from '../hooks/useRecentStays';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    data: bookings,
    isPending: isPendingBookings,
    error: errorBookings,
  } = useRecentBookings();
  const {
    confirmedStays,
    isPending: isPendingStays,
    error: errorStays,
    numDays,
  } = useRecentStays();
  const {
    cabins,
    isLoading: isPendingCabins,
    error: errorCabins,
  } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins)
    return <Spinner />;

  if (errorBookings || errorStays || errorCabins)
    return (
      <div>
        {errorBookings?.message || errorStays?.message || errorCabins?.message}
      </div>
    );

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
