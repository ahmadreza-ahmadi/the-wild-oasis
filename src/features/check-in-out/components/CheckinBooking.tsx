import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { useMoveBack } from '@/hooks/useMoveBack';
import Button from '@/ui/Button';
import ButtonGroup from '@/ui/ButtonGroup';
import ButtonText from '@/ui/ButtonText';
import Checkbox from '@/ui/Checkbox';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';
import Spinner from '@/ui/Spinner';
import { formatCurrency } from '@/utils';
import BookingDataBox from '../../bookings/components/BookingDataBox';
import { useBooking } from '../../bookings/hooks/useBooking';
import { useCheckin } from '../hooks/useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();

  const {
    data: settings,
    isPending: settingsIsPending,
    error: settingsError,
  } = useSettings();
  const {
    data: booking,
    error: bookingError,
    isPending: bookingIsPending,
  } = useBooking();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (booking?.isPaid) setConfirmPaid(booking?.isPaid);
  }, [booking?.isPaid]);

  if (bookingIsPending || settingsIsPending) return <Spinner />;

  if (bookingError || settingsError)
    return <div>{bookingError?.message || settingsError?.message}</div>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    isPaid,
    numGuests,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (hasBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={hasBreakfast}
            onChange={() => {
              setHasBreakfast((hasBreakfast) => !hasBreakfast);
              setConfirmPaid(false);
            }}
            id="has-breakfast"
          >
            Does {guests.fullName} want breakfast for{' '}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm-paid"
          disabled={(isPaid && confirmPaid) || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {hasBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          {isCheckingIn ? 'Checking in...' : `Check in booking #${bookingId}`}
        </Button>
        <Button $variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
