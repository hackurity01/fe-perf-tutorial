import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import { Picture } from "../components/Picture";

import img1 from "../assets/imgs/section7-1.jpg";

function Scene7({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-evenly">
          <Animated
            progress={progress}
            className="boxShadow max-w-[475px]"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.0, 0],
                  [0.2, 1],
                  [0.7, 1],
                  [0.8, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <Picture src={img1} />
          </Animated>

          <div className="flex flex-col items-center justify-center gap-2">
            <Animated
              progress={progress}
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.15, 0],
                    [0.35, 1],
                    [0.78, 1],
                    [0.9, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text text="그리고 이제" />
            </Animated>
            <Animated
              progress={progress}
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.3, 0],
                    [0.45, 1],
                    [0.85, 1],
                    [1.0, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text text="서로와 평생을 약속하려 합니다." />
            </Animated>
          </div>
        </div>
      )}
    </Scene>
  );
}

export default Scene7;
