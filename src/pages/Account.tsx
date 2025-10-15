import UpdatePasswordForm from '@/features/auth/components/UpdatePasswordForm';
import UpdateUserDataForm from '@/features/auth/components/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      {import.meta.env.DEV && <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>}
    </>
  );
}

export default Account;
