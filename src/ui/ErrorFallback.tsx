import { Link, useRouteError } from 'react-router';
import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledErrorFallback = styled.main`
  height: 100%;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorFallback() {
  const error = useRouteError();

  return (
    <StyledErrorFallback>
      <Box>
        <Heading as="h1">Something went wrong ☹️</Heading>
        {error instanceof Error && <p>{error.message}</p>}
        <Button $size="large" as={Link} to="/">
          Try again
        </Button>
      </Box>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
