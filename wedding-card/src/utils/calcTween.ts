import { animation, type AnimationFunction } from "./animation";
/**
 * calcTween: 진행률 → 보간된 값 (keyframes 기반)
 * @param progress - 현재 스크롤 진행률 (0에서 1)
 * @param keyframes - [진행률, 값] 쌍의 배열. 예: [[0,0],[0.1,1],[0.8,1],[1,0]]
 * @param tweenFn - 선택적 애니메이션 함수, 기본값 animation.linear (구간별 적용)
 * @returns keyframes 사이의 보간된 값
 */
export function calcTween({
  progress,
  keyframes,
  tweenFn = animation.linear,
}: {
  progress: number;
  keyframes: Array<[number, number]>;
  tweenFn?: AnimationFunction;
}): number {
  if (!keyframes || keyframes.length === 0) return 0;
  if (progress <= keyframes[0][0]) return keyframes[0][1];
  if (progress >= keyframes[keyframes.length - 1][0])
    return keyframes[keyframes.length - 1][1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    const [p0, v0] = keyframes[i];
    const [p1, v1] = keyframes[i + 1];
    if (progress >= p0 && progress <= p1) {
      const localT = (progress - p0) / (p1 - p0);
      const t = tweenFn(localT);
      return v0 + (v1 - v0) * t;
    }
  }

  return 0;
}
