import styled from 'styled-components';
import LoginForm from '@/features/auth/components/LoginForm';
import Heading from '@/ui/Heading';
import Logo from '@/ui/Logo';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledHeading = styled(Heading)`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <StyledHeading as="h3">Log in to your account</StyledHeading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
