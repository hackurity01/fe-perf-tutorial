import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";
import { Text } from "../components/Text";
import { Picture } from "../components/Picture";
import img1 from "../assets/imgs/section3-1.webp";
import img2 from "../assets/imgs/section3-2.webp";
import img3 from "../assets/imgs/section3-3.webp";

function Scene3({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <div className="relative">
          {/* Image 1 */}
          <Animated
            progress={progress}
            className="fixed z-10 boxShadow w-[75%] max-w-[375px] origin-bottom left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0, 0],
                  [0.1, 1],
                  [0.8, 1],
                  [0.95, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "rotate",
                keyframes: [
                  [0, -5],
                  [0.95, -7],
                ],
                unit: "deg",
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "scale",
                keyframes: [
                  [0, 1],
                  [0.95, 1.1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "translateX",
                keyframes: [
                  [0.0, -30],
                  [0.95, -31],
                ],
                unit: "%",
              },
              {
                prop: "translateY",
                keyframes: [
                  [0.0, -7],
                  [0.95, -8],
                ],
                unit: "%",
              },
            ]}>
            <Picture src={img1} />
          </Animated>

          {/* Image 2 */}
          <Animated
            progress={progress}
            className="fixed z-10 boxShadow w-[75%] max-w-[375px] origin-bottom left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.2, 0],
                  [0.3, 1],
                  [0.8, 1],
                  [0.95, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "rotate",
                keyframes: [
                  [0.2, 1],
                  [0.95, 0],
                ],
                unit: "deg",
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "scale",
                keyframes: [
                  [0.2, 1],
                  [0.95, 1.1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "translateX",
                keyframes: [
                  [0.2, 4],
                  [0.95, 5],
                ],
                unit: "%",
              },
              {
                prop: "translateY",
                keyframes: [
                  [0.2, -17],
                  [0.95, -18],
                ],
                unit: "%",
              },
            ]}>
            <Picture src={img2} />
          </Animated>

          {/* Image 3 */}
          <Animated
            progress={progress}
            className="fixed z-10 boxShadow w-[65%] max-w-[365px] origin-left left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.4, 0],
                  [0.5, 1],
                  [0.8, 1],
                  [0.95, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "rotate",
                keyframes: [
                  [0.4, 4],
                  [0.95, 7],
                ],
                unit: "deg",
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "scale",
                keyframes: [
                  [0.4, 1],
                  [0.95, 1.1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
              {
                prop: "translateX",
                keyframes: [
                  [0.4, -2],
                  [0.95, 0],
                ],
                unit: "%",
              },
              {
                prop: "translateY",
                keyframes: [
                  [0.4, -8],
                  [0.95, -9],
                ],
                unit: "%",
              },
            ]}>
            <Picture src={img3} />
          </Animated>

          {/* Text 1 */}
          <Animated
            progress={progress}
            className="fixed z-10 bottom-12 left-1/2 transform -translate-x-1/2"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0, 0],
                  [0.15, 1],
                  [0.3, 1],
                  [0.4, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <Text text={"열심히 사랑했고"} />
          </Animated>

          {/* Text 2 */}
          <Animated
            progress={progress}
            className="fixed z-10 bottom-12 left-1/2 transform -translate-x-1/2"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.4, 0],
                  [0.5, 1],
                  [0.65, 1],
                  [0.75, 0],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <Text text={"함께 성장했습니다."} />
          </Animated>
        </div>
      )}
    </Scene>
  );
}

export default Scene3;
