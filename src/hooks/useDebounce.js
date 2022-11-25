import { useEffect, useState } from "react";

export default function useDebounce(defaultvalue) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setValue(defaultvalue), 500);
    return () => clearTimeout(timeout);
  }, [defaultvalue]);

  return value;
}
