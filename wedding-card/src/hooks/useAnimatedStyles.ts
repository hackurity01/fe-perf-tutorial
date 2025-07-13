import type { CSSProperties } from "react";
import { calcTween } from "../utils/calcTween";

export type Descriptor = {
  /** CSS 속성명 또는 transform 함수명(e.g. 'translateX','scale') */
  prop: keyof CSSProperties | "translateX" | "translateY" | "rotate";
  keyframes: Array<[number, number]>; // [progress, value] 쌍의 배열
  unit?: string; // 기본: ''
  tweenFn?: (t: number) => number; // 기본 linear (구간별 적용)
};

export function useAnimatedStyles(
  progress: number,
  descriptors: Descriptor[]
): CSSProperties {
  const styles: Record<string, string> = {};
  const transformFns: string[] = [];

  descriptors.forEach(({ prop, keyframes, unit = "", tweenFn }) => {
    const value = calcTween({
      progress,
      keyframes,
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
