import { type Descriptor, useAnimatedStyles } from "../hooks/useAnimatedStyles";

interface AnimatedProps {
  progress: number;
  animations: Descriptor[];
  children?: React.ReactNode;
}

export function Animated({ progress, animations, children }: AnimatedProps) {
  const style = useAnimatedStyles(progress, animations);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        ...style,
      }}>
      {children}
    </div>
  );
}
