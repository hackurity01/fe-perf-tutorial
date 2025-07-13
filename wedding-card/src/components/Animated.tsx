import type { CSSProperties } from "react";
import { type Descriptor, useAnimatedStyles } from "../hooks/useAnimatedStyles";

interface AnimatedProps {
  progress: number;
  animations: Descriptor[];
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Animated({
  progress,
  animations,
  children,
  style,
  className,
}: AnimatedProps) {
  const animatedStyle = useAnimatedStyles(progress, animations);

  return (
    <span
      style={{
        ...animatedStyle,
        ...style,
      }}
      className={className}>
      {children}
    </span>
  );
}
