import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useCheckout } from '@/features/check-in-out/hooks/useCheckout';
import { useMoveBack } from '@/hooks/useMoveBack';
import Button from '@/ui/Button';
import ButtonGroup from '@/ui/ButtonGroup';
import ButtonText from '@/ui/ButtonText';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Heading from '@/ui/Heading';
import Modal from '@/ui/Modal';
import Row from '@/ui/Row';
import Spinner from '@/ui/Spinner';
import Tag from '@/ui/Tag';
import { STATUS_TAG_COLORS } from '../constants';
import { useBooking } from '../hooks/useBooking';
import { useDeleteBooking } from '../hooks/useDeleteBooking';
import BookingDataBox from './BookingDataBox';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isPending, error } = useBooking();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag $type={STATUS_TAG_COLORS[booking.status]}>
            {booking.status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open
            opens="delete-booking"
            renderEl={(open) => (
              <Button $variant="danger" onClick={open} disabled={isDeleting}>
                Delete booking
              </Button>
            )}
          />

          <Modal.Window
            name="delete-booking"
            renderProps
            renderContent={(closeModal) => (
              <ConfirmDelete
                resourceName={`booking #${booking.id}`}
                isDeleting={isDeleting}
                disabled={isDeleting}
                onCancel={closeModal}
                onConfirm={() =>
                  deleteBooking(booking.id, {
                    onSuccess: () => {
                      closeModal();
                      navigate('/bookings');
                    },
                  })
                }
              />
            )}
          />
        </Modal>

        {booking.status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}

        {booking.status === 'checked-in' && (
          <Button onClick={() => checkout(booking.id)} disabled={isCheckingOut}>
            {isCheckingOut ? 'Checking out...' : 'Check out'}
          </Button>
        )}

        <Button $variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
