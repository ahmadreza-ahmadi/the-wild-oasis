import type { ComponentProps } from 'react';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import Spinner from '@/ui/Spinner';
import { useSettings } from '../hooks/useSettings';
import { useUpdateSetting } from '../hooks/useUpdateSetting';
import type { Setting } from '../types';

function UpdateSettingsForm() {
  const { data: settings, error, isLoading } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(target: HTMLInputElement, fieldName: keyof Setting) {
    if (!target.value) return;
    if (settings![fieldName] !== +target.value)
      updateSetting({ [fieldName]: +target.value });
  }

  if (isLoading) return <Spinner />;

  if (error) return <div>{error.message}</div>;

  function inputProps(fieldName: keyof Setting): ComponentProps<'input'> {
    return {
      disabled: isUpdating,
      defaultValue: settings![fieldName],
      type: 'number',
      onBlur: (e) => handleUpdate(e.target, fieldName),
      onKeyDown: (e) =>
        e.code === 'Enter' &&
        handleUpdate(e.target as HTMLInputElement, fieldName),
    };
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input id="min-nights" min={1} {...inputProps('minBookingLength')} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input id="max-nights" min={1} {...inputProps('maxBookingLength')} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input id="max-guests" min={1} {...inputProps('maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input id="breakfast-price" min={0} {...inputProps('breakfastPrice')} />
      </FormRow>
      <span style={{ marginTop: '16px', display: 'block' }}>
        Press <kbd>Enter</kbd> or click outside to save the changes
      </span>
    </Form>
  );
}

export default UpdateSettingsForm;
