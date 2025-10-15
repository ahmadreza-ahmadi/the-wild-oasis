import type { Except } from 'type-fest';
import type z from 'zod';
import type { Tables, TablesInsert } from '@/types/database';
import type { FilterOption } from '@/ui/Filter';
import type { CABIN_DISCOUNT_FILTER_OPTIONS } from './constants/filter';
import type { createCabinSchema } from './schemas';

export type CreateCabinSchema = z.infer<typeof createCabinSchema>;

export type Cabin = Tables<'cabins'>;

export interface NewCabin extends Except<TablesInsert<'cabins'>, 'imageUrl'> {
  imageFile: File;
}

export type CabinChanges = Partial<NewCabin>;

export interface DiscountFilterOptions extends FilterOption {
  criteria: (discount: Cabin['discount']) => boolean;
}

export type DiscountFilterValue =
  (typeof CABIN_DISCOUNT_FILTER_OPTIONS)[number]['value'];
