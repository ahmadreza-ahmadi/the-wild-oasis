import type { ComponentProps } from 'react';
import styled from 'styled-components';

interface StyledSelectProps {
  $isWhite?: boolean;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${({ $isWhite }) =>
      $isWhite ? 'var(--color-grey-100)' : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps<TOption extends SelectOption>
  extends ComponentProps<'select'> {
  options: TOption[];
  renderOption: (option: TOption) => React.ReactNode;
  isWhite?: boolean;
}

function Select<TOption extends SelectOption>({
  options,
  renderOption,
  isWhite,
  ...rest
}: SelectProps<TOption>) {
  return (
    <StyledSelect $isWhite={isWhite} {...rest}>
      {options.map(renderOption)}
    </StyledSelect>
  );
}

export default Select;
