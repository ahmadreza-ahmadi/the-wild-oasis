import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router';
import styled from 'styled-components';
import { PAGINATION_PAGE_SIZE } from '@/constants/pagination';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

interface PaginationButtonProps {
  $isActive?: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${({ $isActive }) =>
    $isActive ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${({ $isActive }) =>
    $isActive ? ' var(--color-brand-50)' : 'inherit'};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface PaginationProps {
  count: number;
}

function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageParam = searchParams.get('page');
  const currentPage = currentPageParam ? +currentPageParam : 1;

  const numPages = Math.ceil(count / PAGINATION_PAGE_SIZE);

  function handleNext() {
    if (currentPage < numPages) {
      searchParams.set('page', (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      searchParams.set('page', (currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  }

  if (count <= PAGINATION_PAGE_SIZE) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGINATION_PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === numPages
            ? count
            : currentPage * PAGINATION_PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </P>
      <Buttons>
        {currentPage > 1 && (
          <PaginationButton onClick={handlePrev}>
            <HiChevronLeft />
            <span>Previous</span>
          </PaginationButton>
        )}

        {currentPage < numPages && (
          <PaginationButton onClick={handleNext}>
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
