import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import img1 from "../assets/imgs/section2/section2-1.jpg";
import img2 from "../assets/imgs/section2/section2-2.jpg";
import { Picture } from "../components/Picture";

function Scene2({ height }: { height: number }) {
  return (
    <div className="relative">
      <div className="h-[400px] absolute z-10 top-0 left-0 w-full bg-gradient-to-b from-white to-transparent" />
      <Scene height={height} className="bg-[#283034]">
        {(progress) => (
          <>
            <Animated
              progress={progress}
              className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.1, 0],
                    [0.15, 1],
                    [0.2, 1],
                    [0.25, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Text text="4년 전, 겨울" />
            </Animated>

            <Animated
              progress={progress}
              className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.3, 0],
                    [0.4, 1],
                    [0.5, 1],
                    [0.6, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Picture src={img1} />
              <br />
              <br />
              <Text text={"개발하는 남자와"} />
            </Animated>

            <Animated
              progress={progress}
              className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animations={[
                {
                  prop: "opacity",
                  keyframes: [
                    [0.65, 0],
                    [0.75, 1],
                    [0.85, 1],
                    [0.95, 0],
                  ],
                  tweenFn: animation.easeInOutQuad,
                },
              ]}>
              <Picture src={img2} />
              <br />
              <br />
              <Text text={"디자인하는 여자가 만났습니다."} />
            </Animated>
          </>
        )}
      </Scene>
    </div>
  );
}

export default Scene2;
