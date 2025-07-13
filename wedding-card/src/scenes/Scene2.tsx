import { Scene } from "../components/Scene";
import { animation } from "../utils/animation";
import { Animated } from "../components/Animated";

function Scene2() {
  return (
    <Scene start={1600} end={3200}>
      {(progress) => (
        <Animated
          progress={progress}
          animations={[
            {
              prop: "translateX",
              from: 0,
              to: 100,
              unit: "%",
              range: [0, 1],
              tweenFn: animation.easeInOutQuad,
            },
            { prop: "opacity", from: 0, to: 1, range: [0, 0.2] },
          ]}>
          <div>test</div>
        </Animated>
      )}
    </Scene>
  );
}

export default Scene2;
