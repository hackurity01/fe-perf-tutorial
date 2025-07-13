import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import { Picture } from "../components/Picture";
import img1 from "../assets/imgs/section4/section4-1.jpg";

function Scene4({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <div className="fixed z-10 w-full flex flex-col items-center gap-2.5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <Text text={"때로는 슬프기도,"} />
          </Animated>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.13, 0],
                  [0.43, 1],
                  [0.78, 1],
                  [1, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}
            style={{
              width: "95%",
              maxWidth: "475px",
              margin: "35px auto",
            }}
            className="boxShadow">
            <Picture src={img1} />
          </Animated>
          <Animated
            progress={progress}
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.23, 0],
                  [0.58, 1],
                  [0.88, 1],
                  [1, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <Text text={"감정이 상하기도 했지만"} />
          </Animated>
        </div>
      )}
    </Scene>
  );
}

export default Scene4;
