import { useEffect, useState } from "react";

export const parseLocalStorageArray = (storageProperty) =>
  JSON.parse(localStorage.getItem(storageProperty) || "[]");

const useLocalStorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const persistedValue = window.localStorage.getItem(key);
    return persistedValue ? JSON.parse(persistedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
