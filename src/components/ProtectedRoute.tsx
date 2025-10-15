import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useUser } from '@/features/auth/hooks/useUser';
import Spinner from '@/ui/Spinner';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}

export default ProtectedRoute;
