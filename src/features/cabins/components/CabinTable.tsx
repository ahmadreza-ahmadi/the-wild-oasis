import Empty from '@/ui/Empty';
import Menus from '@/ui/Menus';
import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import { useCabins } from '../hooks/useCabins';
import CabinRow from './CabinRow';

function CabinTable() {
  const { cabins, error, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table gridTemplateColumns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          renderRow={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
