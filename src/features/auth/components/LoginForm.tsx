import { useState, type FormEvent } from 'react';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormRowVertical from '@/ui/FormRowVertical';
import Input from '@/ui/Input';
import SpinnerMini from '@/ui/SpinnerMini';
import { useLogin } from '../hooks/useLogin';

function LoginForm() {
  const [email, setEmail] = useState('guest@thewildoasis.com');
  const [password, setPassword] = useState('123456');
  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled() {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button $size="large" disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Log in'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
