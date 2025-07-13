import { type RefObject, useEffect, useState } from "react";
import { useScrollY } from "./useScrollY";

export function useSceneProgress<T extends Element>(
  ref: RefObject<T | null>,
  height: number
): number {
  const scrollY = useScrollY();
  const [sceneTop, setSceneTop] = useState(0);
  const [prog, setProg] = useState(0);

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
    const raw = (scrollY - sceneTop) / height;
    setProg(raw);
  }, [scrollY, sceneTop, height]);

  return prog;
}
