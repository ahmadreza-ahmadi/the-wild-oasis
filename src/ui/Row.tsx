import styled, { css } from 'styled-components';

const typeStylesMap = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;
  `,
  vertical: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

interface RowProps {
  type?: keyof typeof typeStylesMap;
}

const Row = styled.div<RowProps>`
  display: flex;

  ${({ type = 'vertical' }) => typeStylesMap[type]}
`;

export default Row;
