import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import { Picture } from "../components/Picture";

import img1 from "../assets/imgs/section5-1.webp";
import img2 from "../assets/imgs/section5-2.webp";

function Scene5({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0, 0],
                  [0.35, 1],
                  [0.65, 1],
                  [1, 0],
                ],
                tweenFn: animation["easeInOutQuad"],
              },
            ]}
            className="fixed z-10 top-[10%] left-1/2 -translate-x-1/2">
            <Text text={"함께 하는 것만으로도"} />
          </Animated>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0, 0],
                  [0.3, 1],
                  [0.65, 1],
                  [1, 0],
                ],
                tweenFn: animation["easeInOutQuad"],
              },
            ]}
            className="boxShadow fixed z-10 top-1/2 left-[47%] w-[86%] max-w-[460px] -translate-x-1/2 -translate-y-1/2 origin-center">
            <Picture src={img1} />
          </Animated>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.5, 0],
                  [0.65, 1],
                  [0.8, 1],
                  [1, 0],
                ],
                tweenFn: animation["easeInOutQuad"],
              },
            ]}
            className="boxShadow fixed z-10 top-1/2 left-[64%] w-[60%] max-w-[350px] -translate-x-1/2 -translate-y-1/2 origin-center">
            <Picture src={img2} />
          </Animated>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.55, 0],
                  [0.7, 1],
                  [0.8, 1],
                  [1, 0],
                ],
                tweenFn: animation["easeInOutQuad"],
              },
            ]}
            className="fixed z-10 bottom-[10%] left-1/2 -translate-x-1/2">
            <Text text={"서로가 서로에게"} />
          </Animated>
        </>
      )}
    </Scene>
  );
}

export default Scene5;
