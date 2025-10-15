import styled, { css } from 'styled-components';

interface ButtonProps {
  as: 'h1' | 'h2' | 'h3';
}

const Heading = styled.h1<ButtonProps>`
  ${({ as }) =>
    as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${({ as }) =>
    as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
	${({ as }) =>
    as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;

export default Heading;
