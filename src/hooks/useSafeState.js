import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const useMounted = () => {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

export default function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const mountedRef = useMounted();
  const safeSetState = useCallback(
    (updater) => {
      if (mountedRef.current) {
        setState(updater);
      }
    },
    [mountedRef]
  );

  return [state, safeSetState];
}
