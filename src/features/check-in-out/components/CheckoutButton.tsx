import type { Booking } from '@/features/bookings/types';
import Button from '@/ui/Button';
import { useCheckout } from '../hooks/useCheckout';

interface CheckoutButtonProps {
  bookingId: Booking['id'];
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      $variant="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? 'Checking out...' : 'Check out'}
    </Button>
  );
}

export default CheckoutButton;
