import { useEffect, useState } from 'react';

export function useLocalStorageState<S>(key: string, initialState?: S) {
  const [value, setValue] = useState<S>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue] as const;
}
