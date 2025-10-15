import type { UserAttributes } from '@supabase/supabase-js';
import { uploadFile } from '@/services';
import supabase from '@/services/supabase';
import type { LoginPayload } from './types/login';
import type { SignupPayload } from './types/signup';

export async function signup({ email, password, fullName }: SignupPayload) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateUser(changes: UserAttributes) {
  const avatarUrl =
    changes.data &&
    'avatar' in changes.data &&
    changes.data.avatar instanceof File
      ? await uploadFile(changes.data.avatar, 'avatars')
      : '';

  const updatedUser = { ...changes };
  if (updatedUser.data && 'avatar' in updatedUser.data) {
    delete updatedUser.data.avatar;
    if (avatarUrl) updatedUser.data.avatar = avatarUrl;
  }

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
