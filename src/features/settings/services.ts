import supabase from '@/services/supabase';
import type { SettingChanges } from './types';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function updateSetting(changes: SettingChanges) {
  const { data, error } = await supabase
    .from('settings')
    .update(changes)
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
