import styled, { css } from 'styled-components';

export interface FormProps {
  $isModal?: boolean;
}

const Form = styled.form<FormProps>`
  ${({ $isModal }) =>
    !$isModal &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${({ $isModal }) =>
    $isModal &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
