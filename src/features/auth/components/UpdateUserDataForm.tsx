import { useState, type FormEvent } from 'react';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUser } from '../hooks/useUser';

function UpdateUserDataForm() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user!;
  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      {
        data: {
          fullName,
          avatar: avatar || '',
        },
      },
      {
        onSuccess() {
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleReset() {
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      {import.meta.env.DEV && <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) =>
            setAvatar(e.target.files?.[0] ? e.target.files[0] : null)
          }
        />
      </FormRow>}
      <FormRow>
        <Button type="reset" $variant="secondary" onClick={handleReset}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update account'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
