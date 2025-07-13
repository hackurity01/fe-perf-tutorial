import { type RefObject, useEffect, useState } from "react";
import { useScrollY } from "./useScrollY";

export function useSceneProgress<T extends Element>(
  ref: RefObject<T | null>,
  start: number,
  end: number
): number {
  const scrollY = useScrollY();
  const [sceneTop, setSceneTop] = useState(0);
  const [prog, setProg] = useState(0);

  // 마운트 & 리사이즈에만 위치 측정
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const measure = () => {
      const rect = ref.current!.getBoundingClientRect();
      setSceneTop(rect.top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  // 스크롤에 따라 progress 계산
  useEffect(() => {
    const raw = (scrollY - sceneTop + start) / (end - start);
    setProg(Math.min(1, Math.max(0, raw)));
  }, [scrollY, sceneTop, start, end]);

  return prog;
}
