import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import SpinnerMini from '@/ui/SpinnerMini';
import { useSignup } from '../hooks/useSignup';
import { createUserSchema } from '../schemas/create-user';

function SignupForm() {
  const { isSigningUp, signup } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createUserSchema),
    mode: 'onTouched',
  });

  function onSubmit({
    email,
    fullName,
    password,
  }: z.infer<typeof createUserSchema>) {
    signup(
      { email, fullName, password },
      {
        onSuccess() {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName}>
        <Input type="text" id="fullName" {...register('fullName')} />
      </FormRow>

      <FormRow label="Email address" error={errors.email}>
        <Input type="email" id="email" {...register('email')} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password}>
        <Input type="password" id="password" {...register('password')} />
      </FormRow>

      <FormRow label="Repeat password" error={errors.repeatPassword}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('repeatPassword')}
        />
      </FormRow>

      <FormRow>
        <Button $variant="secondary" type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : 'Create new user'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
