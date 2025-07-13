import { useRef, useState, useEffect } from "react";
import { useSceneProgress } from "../hooks/useSceneProgress";

interface SceneProps {
  start: number;
  end: number;
  children?: (progress: number) => React.ReactNode;
}

export function Scene({ start, end, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSceneProgress(ref, start, end);
  const [containerHeight, setContainerHeight] = useState(
    end - start + (typeof window !== "undefined" ? window.innerHeight : 0)
  );

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(end - start + window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [start, end]);

  return (
    <div ref={ref} style={{ position: "relative", height: containerHeight }}>
      {children?.(progress)}
    </div>
  );
}
