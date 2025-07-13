import { animation, type AnimationFunction } from "./animation";
/**
 * calcTween: 진행률 → 보간된 값
 * @param progress - 현재 스크롤 진행률 (0에서 1)
 * @param from - 시작 값
 * @param to - 끝 값
 * @param range - 선택적 [시작진행률, 끝진행률], 기본값 [0,1]
 * @param AnimationFunction - 선택적 애니메이션 함수, 기본값 animation.linear
 * @returns `from`과 `to` 사이의 보간된 값
 */
export function calcTween({
  progress,
  from,
  to,
  progressRange = [0, 1],
  tweenFn = animation.linear,
}: {
  progress: number;
  from: number;
  to: number;
  progressRange?: [number, number];
  tweenFn?: AnimationFunction;
}): number {
  const [r0, r1] = progressRange;
  // map progress into [0,1] within the given range
  const clamped = Math.min(1, Math.max(0, (progress - r0) / (r1 - r0)));
  // apply easing
  const t = tweenFn(clamped);
  // interpolate
  return from + (to - from) * t;
}
