import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";

function Scene8({ height }: { height: number }) {
  return (
    <Scene height={height} className="bg-[#283034]">
      {(progress) => (
        <div className="sticky z-10 top-1/2 left-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-evenly">
          <Animated
            progress={progress}
            className="mb-4"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.0, 0],
                  [0.1, 1],
                  [0.3, 1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <div className="text-white mb-4 text-lg">참석하셔서</div>
          </Animated>
          <Animated
            progress={progress}
            className="mb-4"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.1, 0],
                  [0.2, 1],
                  [0.4, 1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <div className="text-white mb-4 text-lg">
              작은 축복을 보태어 주시면
            </div>
          </Animated>
          <Animated
            progress={progress}
            className="mb-4"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.3, 0],
                  [0.4, 1],
                  [0.5, 1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <div className="text-white mb-4 text-lg">
              더없는 행복으로 간직하겠습니다.
            </div>
          </Animated>
          <Animated
            progress={progress}
            className="mb-4"
            animations={[
              {
                prop: "opacity",
                keyframes: [
                  [0.4, 0],
                  [0.5, 1],
                  [0.6, 1],
                ],
                tweenFn: animation.easeInOutQuad,
              },
            ]}>
            <div className="w-2/3 border-t border-white opacity-80 my-8 mx-auto"></div>
            <table className="mx-auto border-collapse text-white text-[1.15rem] leading-8">
              <tbody>
                <tr>
                  <td className="text-center">
                    <span>김철수</span>
                    <span className="pl-2">박영희의</span>
                  </td>
                  <td className="text-center">
                    <span className="pl-2">차남</span>
                    <span className="pl-2 text-[1.2rem]">김신랑</span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <span>이철수</span>
                    <span className="pl-2">김영희</span>
                  </td>
                  <td className="text-center">
                    <span className="pl-2">차녀</span>
                    <span className="pl-2 text-[1.2rem]">이신부</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Animated>
        </div>
      )}
    </Scene>
  );
}

export default Scene8;
