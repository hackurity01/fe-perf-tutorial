import { useEffect, useRef, useState } from "react";

export function useScrollY(callback?: (scrollY: number) => void): number {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrollY(y);
          callback?.(y);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback]);

  return scrollY;
}
