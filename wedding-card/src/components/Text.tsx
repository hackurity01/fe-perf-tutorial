import type { ReactNode, CSSProperties } from "react";

interface TextProps {
  text: ReactNode;
  color?: string;
  style?: CSSProperties;
  className?: string;
  noShadow?: boolean;
}

export function Text({
  text,
  color = "#fff",
  noShadow = false,
  style = {},
  className,
}: TextProps) {
  return (
    <span
      className={className}
      style={{
        color,
        textShadow: noShadow
          ? "none"
          : "0 0 20px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.8)",
        ...style,
      }}>
      {text}
    </span>
  );
}
