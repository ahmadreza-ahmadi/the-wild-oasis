import { uploadFile } from '@/services';
import supabase from '../../services/supabase';
import type { Cabin, CabinChanges, NewCabin } from './types';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('An error occured while fetching cabins');
  }

  return data;
}

export async function createCabin(newCabin: NewCabin) {
  const imageUrl = await uploadFile(newCabin.imageFile, 'cabin-images');

  const { description, discount, maxCapacity, name, regularPrice } = newCabin;

  const { error } = await supabase.from('cabins').insert({
    name,
    description,
    discount,
    maxCapacity,
    regularPrice,
    imageUrl,
  });

  if (error) {
    console.error(error);
    throw new Error('An error occured while creating the new cabin');
  }
}

export async function duplicateCabin(cabin: Cabin) {
  const { error } = await supabase
    .from('cabins')
    .insert({ ...cabin, name: `${cabin.name} (Copy)` });

  if (error) {
    console.error(error);
    throw new Error('An error occured while duplicating the cabin');
  }
}

export async function deleteCabin(id: Cabin['id']) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('An error occured while deleting the cabin');
  }
}

export async function editCabin(id: Cabin['id'], cabinChanges: CabinChanges) {
  const imageUrl = cabinChanges.imageFile
    ? await uploadFile(cabinChanges.imageFile, 'cabin-images')
    : null;

  const editedCabin: CabinChanges & Partial<Pick<Cabin, 'imageUrl'>> = {
    ...cabinChanges,
  };
  delete editedCabin.imageFile;
  if (imageUrl) editedCabin.imageUrl = imageUrl;

  const { error } = await supabase
    .from('cabins')
    .update(editedCabin)
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('An error occured while updating the cabin');
  }
}
