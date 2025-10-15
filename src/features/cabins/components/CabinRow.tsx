import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Menus from '@/ui/Menus';
import Modal from '@/ui/Modal';
import Table from '@/ui/Table';
import { formatCurrency } from '@/utils';
import { useDeleteCabin } from '../hooks/useDeleteCabin';
import { useDuplicateCabin } from '../hooks/useDuplicateCabin';
import type { Cabin } from '../types';
import CabinForm from './CabinForm';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
  border-radius: 4px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export interface CabinRowProps {
  cabin: Cabin;
}

function CabinRow({ cabin }: CabinRowProps) {
  const { imageUrl, maxCapacity, regularPrice, name, discount, id } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { duplicateCabin, isDuplicating } = useDuplicateCabin();

  const handleDuplicte = () => duplicateCabin(cabin);

  return (
    <Table.Row>
      {imageUrl ? <Img src={imageUrl} /> : <Img as="div" />}
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button
              disabled={isDuplicating}
              onClick={handleDuplicte}
              icon={<HiSquare2Stack size={16} />}
            >
              Duplicate
            </Menus.Button>

            <Modal.Open
              opens="cabin-form"
              renderEl={(open) => (
                <Menus.Button onClick={open} icon={<HiPencil size={16} />}>
                  Edit
                </Menus.Button>
              )}
            />

            <Modal.Open
              opens="delete-cabin"
              renderEl={(open) => (
                <Menus.Button
                  onClick={open}
                  disabled={isDeleting}
                  icon={<HiTrash size={16} />}
                >
                  Delete
                </Menus.Button>
              )}
            />
          </Menus.List>

          <Modal.Window name="cabin-form">
            <CabinForm mode="edit" initialCabin={cabin} />
          </Modal.Window>

          <Modal.Window
            name="delete-cabin"
            renderProps
            renderContent={(closeModal) => (
              <ConfirmDelete
                resourceName={`cabin ${name}`}
                isDeleting={isDeleting}
                disabled={isDeleting}
                onCancel={closeModal}
                onConfirm={() => deleteCabin(id, { onSuccess: closeModal })}
              />
            )}
          />
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
