import { Scene } from "../components/Scene";
import mainImg from "../assets/imgs/main.jpg";

function Scene1({ height }: { height: number }) {
  return (
    <Scene height={height}>
      {() => {
        return (
          <div
            className="flex flex-col items-center justify-around overflow-hidden"
            style={{ minHeight: height - 50 }}>
            <div className="flex items-center justify-around w-full pt-10">
              <div className="text-xl">김신랑</div>
              <div className="flex flex-col text-lg w-12 items-stretch text-center">
                <div className="border-b">11</div>
                <div>28</div>
              </div>
              <div className="text-xl">이신부</div>
            </div>

            <div className="w-full p-6">
              <img
                src={mainImg}
                alt="웨딩 사진"
                className="w-full object-cover"
              />
            </div>

            <div className="text-center text-base text-gray-700 mb-4">
              <div>2020년 11월 28일 토요일 오후 1시 30분</div>
              <div>아산 모나무르 아레나홀</div>
            </div>
            <div className="flex justify-center mt-2">
              <div className="animate-bounce">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGQ9Im00MC40LDEyMS4zYy0wLjgsMC44LTEuOCwxLjItMi45LDEuMnMtMi4xLTAuNC0yLjktMS4yYy0xLjYtMS42LTEuNi00LjIgMC01LjhsNTEtNTEtNTEtNTFjLTEuNi0xLjYtMS42LTQuMiAwLTUuOCAxLjYtMS42IDQuMi0xLjYgNS44LDBsNTMuOSw1My45YzEuNiwxLjYgMS42LDQuMiAwLDUuOGwtNTMuOSw1My45eiIvPgogICAgPC9nPgo8L3N2Zz4="
                  alt={"down"}
                  className="w-6 h-6 rotate-90"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        );
      }}
    </Scene>
  );
}

export default Scene1;
