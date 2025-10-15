import Filter from '@/ui/Filter';
import SortBy from '@/ui/SortBy';
import TableOperations from '@/ui/TableOperations';
import { CABIN_DISCOUNT_FILTER_OPTIONS } from '../constants/filter';
import { CABIN_SORT_OPTIONS } from '../constants/sort';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter by="discount" options={CABIN_DISCOUNT_FILTER_OPTIONS} />
      <SortBy options={CABIN_SORT_OPTIONS} />
    </TableOperations>
  );
}

export default CabinTableOperations;
