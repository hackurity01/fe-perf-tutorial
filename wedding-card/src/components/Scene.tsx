import { useRef } from "react";
import { useSceneProgress } from "../hooks/useSceneProgress";

interface SceneProps {
  height: number;
  children?: (progress: number) => React.ReactNode;
  className?: string;
}

export function Scene({ height, className, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSceneProgress(ref, height);

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{
        height,
      }}>
      <div className="max-w-[500px] m-auto h-full">
        {0 <= progress && progress < 1 ? children?.(progress) : null}
      </div>
    </div>
  );
}
