import { useEffect, useState } from "react";

/* Lazily reads `key` from localStorage on first render, then keeps it in sync
   on every state update. `initialValue` may be a value or a factory function. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch {
      /* ignore corrupted storage and fall back to the initial value */
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — fail silently, app still works in-memory */
    }
  }, [key, value]);

  return [value, setValue];
}
