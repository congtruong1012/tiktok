import { useState, useEffect, useMemo } from "react";

function useViewPort(targetRef, options) {
  const [isShow, setIsShow] = useState(false);

  const optionsMemo = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsShow(entry.isIntersecting);
    }, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [targetRef, optionsMemo]);

  return isShow;
}

export { useViewPort };
