import { differenceInDays, formatDistance, parseISO } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end: boolean } | null = null) {
  const today = new Date();

  // This is necessary to compare with createdAt from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export function safeSort<TIndex>(
  arr: TIndex[],
  by: keyof TIndex,
  order?: 'asc' | 'desc' | (string & {})
) {
  return [...arr].sort((a, b) => {
    const aVal = a[by];
    const bVal = b[by];

    if (!aVal && !bVal) return 0;
    if (!aVal) return 1;
    if (!bVal) return -1;

    if (order === 'desc') {
      if (aVal > bVal) return -1;
      if (aVal < bVal) return 1;
      return 0;
    }

    // Ascending
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
}
