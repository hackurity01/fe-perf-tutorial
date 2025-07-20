import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import { Picture } from "../components/Picture";

import img1 from "../assets/imgs/section6-1.webp";
import img2 from "../assets/imgs/section6-2.webp";

function Scene6({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.0, 0],
                  [0.3, 1],
                  [0.55, 1],
                  [0.7, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}
            className="boxShadow w-[92%] max-w-[460px]">
            <Picture src={img1} />
          </Animated>

          <div className="flex justify-center gap-2 my-9 whitespace-nowrap">
            <Animated
              progress={progress}
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.1, 0],
                    [0.3, 1],
                    [0.6, 1],
                    [0.8, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text style={{ color: "white" }} text="가장" />
            </Animated>
            <Animated
              progress={progress}
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.2, 0],
                    [0.4, 1],
                    [0.7, 1],
                    [0.85, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text style={{ color: "white" }} text="큰 힘이" />
            </Animated>
            <Animated
              progress={progress}
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.3, 0],
                    [0.5, 1],
                    [0.8, 1],
                    [0.9, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text style={{ color: "white" }} text="되어주었습니다." />
            </Animated>
          </div>

          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.4, 0],
                  [0.55, 1],
                  [0.85, 1],
                  [1, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}
            className="boxShadow w-[92%] max-w-[460px]">
            <Picture src={img2} />
          </Animated>
        </div>
      )}
    </Scene>
  );
}

export default Scene6;
