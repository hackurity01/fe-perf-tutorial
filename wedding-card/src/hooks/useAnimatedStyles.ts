import type { CSSProperties } from "react";
import { calcTween } from "../utils/calcTween";

export type Descriptor = {
  /** CSS 속성명 또는 transform 함수명(e.g. 'translateX','scale') */
  prop: keyof CSSProperties | "translateX" | "translateY" | "rotate";
  from: number;
  to: number;
  unit?: string; // 기본: ''
  range?: [number, number]; // progress 범위, 기본 [0,1]
  tweenFn?: (t: number) => number; // 기본 linear
};

export function useAnimatedStyles(
  progress: number,
  descriptors: Descriptor[]
): CSSProperties {
  const styles: Record<string, string> = {};
  const transformFns: string[] = [];

  descriptors.forEach(({ prop, from, to, unit = "", range, tweenFn }) => {
    const value = calcTween({
      progress,
      from,
      to,
      progressRange: range,
      tweenFn,
    });
    if (prop === "translateX" || prop === "translateY" || prop === "rotate") {
      const fn = `${prop}(${value}${unit})`;
      transformFns.push(fn);
    } else {
      styles[prop] = `${value}${unit}`;
    }
  });

  if (transformFns.length > 0) {
    styles.transform = transformFns.join(" ");
  }

  return styles as CSSProperties;
}
