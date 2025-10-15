import { useSearchParams } from 'react-router';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonProps {
  $isActive?: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  by: string;
  options: FilterOption[];
}

function Filter({ by, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue = searchParams.get(by) || options[0].value;

  const handleClick = (value: FilterOption['value']) => {
    searchParams.set(by, value);
    if (searchParams.get('page')) searchParams.set('page', '1');

    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          $isActive={currentFilterValue === option.value}
          key={option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
