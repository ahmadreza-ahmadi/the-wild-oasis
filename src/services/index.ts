import supabase from './supabase';

export async function uploadFile(file: File, bucket: string) {
  const imageName = `${Date.now()}-${file.name}`.replaceAll('/', '');

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(imageName, file);

  if (error) {
    console.error(error);
    throw new Error('An error occured while uploading the file');
  }

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
}
