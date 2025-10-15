import type { Except } from 'type-fest';
import type { Tables } from '@/types/database';

export type Setting = Tables<'settings'>;

export type SettingChanges = Partial<Except<Setting, 'id' | 'createdAt'>>;
