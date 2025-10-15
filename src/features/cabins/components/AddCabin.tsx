import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import CabinForm from './CabinForm';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          renderEl={(open) => <Button onClick={open}>Add new cabin</Button>}
        />

        <Modal.Window name="cabin-form">
          <CabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
