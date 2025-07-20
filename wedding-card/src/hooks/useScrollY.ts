import { useEffect, useState } from "react";

export function useScrollY(callback?: (scrollY: number) => void): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      callback?.(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback]);

  return scrollY;
}
