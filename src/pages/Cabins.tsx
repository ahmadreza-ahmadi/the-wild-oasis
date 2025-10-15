import AddCabin from '@/features/cabins/components/AddCabin';
import CabinTableOperations from '@/features/cabins/components/CabinTableOperations';
import CabinTable from '../features/cabins/components/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
