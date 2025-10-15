import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { ModalContext } from '@/ui/Modal';
import Textarea from '@/ui/Textarea';
import { useCreateCabin } from '../hooks/useCreateCabin';
import { useEditCabin } from '../hooks/useEditCabin';
import { createCabinSchema } from '../schemas';
import type { Cabin, CreateCabinSchema, NewCabin } from '../types';

export type CabinFormProps = {} & (
  | {
      mode?: 'create';
    }
  | {
      mode: 'edit';
      initialCabin: Cabin;
    }
);

function CabinForm(props: CabinFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    resolver: zodResolver(createCabinSchema),
    mode: 'onTouched',
    defaultValues:
      props.mode === 'edit'
        ? {
            description: props.initialCabin.description,
            regularPrice: props.initialCabin.regularPrice,
            discount: props.initialCabin.discount,
            name: props.initialCabin.name,
            maxCapacity: props.initialCabin.maxCapacity,
            imageFile: null,
          }
        : {},
  });

  const modalContext = useContext(ModalContext);

  const { isCreating, createCabin } = useCreateCabin();

  const onSuccess = () => {
    reset();
    modalContext?.close();
  };

  const { isEditing, editCabin } = useEditCabin();

  const onSubmit = (data: CreateCabinSchema) => {
    if (props.mode === 'edit') {
      const changes: Record<string, unknown> = {};

      for (const key of Object.keys(
        dirtyFields
      ) as (keyof CreateCabinSchema)[]) {
        if (data[key] !== undefined && data[key] !== null)
          changes[key] = data[key];
      }

      if (!Object.keys(changes).length) {
        toast.error('There are no changes to be made');
        return;
      }

      editCabin(
        {
          id: props.initialCabin.id,
          changes,
        },
        { onSuccess }
      );
    } else {
      createCabin(data as NewCabin, { onSuccess });
    }
  };

  function getSubmitButtonText() {
    if (props.mode === 'edit')
      return isEditing ? 'Editing the cabin...' : 'Edit cabin';
    return isCreating ? 'Creating the cabin...' : 'Create cabin';
  }

  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} $isModal>
      <FormRow label="Cabin name" labelFor="name" error={errors.name}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register('name')}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        labelFor="maxCapacity"
        error={errors.maxCapacity}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          min={1}
          {...register('maxCapacity', { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        labelFor="regularPrice"
        error={errors.regularPrice}
      >
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          min={1}
          {...register('regularPrice', { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Discount" labelFor="discount" error={errors.discount}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          min={0}
          {...register('discount', { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Description for website" labelFor="description">
        <Textarea
          disabled={isWorking}
          id="description"
          {...register('description')}
        />
      </FormRow>

      <FormRow label="Cabin photo" labelFor="image" error={errors.imageFile}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register('imageFile', { required: false })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variant="secondary"
          type="button"
          onClick={() => modalContext?.close()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {getSubmitButtonText()}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
