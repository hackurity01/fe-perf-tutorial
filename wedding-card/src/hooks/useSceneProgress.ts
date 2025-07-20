import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollY } from "./useScrollY";

export function useSceneProgress<T extends Element>(
  ref: RefObject<T | null>,
  height: number,
  initialProgress: number = -10
): number {
  const sceneTopRef = useRef(0);
  const [prog, setProg] = useState(initialProgress);
  useScrollY(
    useCallback(
      (y: number) => {
        const raw = (y - sceneTopRef.current) / height;
        setProg(raw);
      },
      [height]
    )
  );

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const measure = () => {
      const rect = ref.current!.getBoundingClientRect();
      sceneTopRef.current = rect.top + window.scrollY;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return prog;
}
