import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 * Advanced requirement: Debounces rapidly changing values (like search input)
 * to avoid excessive filtering/rendering until user pauses typing.
 *
 * @param {any} value
 * @param {number} delay (ms)
 * @returns {any} debouncedValue
 */
export const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
