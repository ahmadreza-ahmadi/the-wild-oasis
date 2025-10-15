import { useSearchParams } from 'react-router';
import type { SortOrder } from '@/types/sort';
import Select, { type SelectOption } from './Select';

export interface SortOption extends SelectOption {
  order: SortOrder;
}

interface SortByProps {
  options: SortOption[];
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get('sort-by');
  const currentSortOrder = searchParams.get('sort-order');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [sortBy, sortOrder] = e.target.value.split('/');

    searchParams.set('sort-by', sortBy);
    searchParams.set('sort-order', sortOrder);
    setSearchParams(searchParams);
  }

  return (
    <Select
      isWhite
      options={options}
      onChange={handleChange}
      value={`${currentSortBy}/${currentSortOrder}`}
      renderOption={(option) => (
        <option key={option.label} value={`${option.value}/${option.order}`}>
          {option.label}
        </option>
      )}
    />
  );
}

export default SortBy;
