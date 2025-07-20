import { useEffect } from "react";

// Kakao Maps global type
declare global {
  interface Window {
    daum: {
      roughmap: {
        Lander: new (options: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
  }
}

function SceneMap() {
  useEffect(() => {
    new window.daum.roughmap.Lander({
      timestamp: "1752412797492",
      key: "5k2nkmwe88t",
      mapWidth: Math.min(500, window.innerWidth).toString(),
      mapHeight: "360",
    }).render();
  }, []);

  return (
    <section className="relative z-[100] max-w-[500px] mx-auto pt-24">
      <h2 className="text-xl mb-2">오시는 길</h2>
      <div
        id="daumRoughmapContainer1752412797492"
        className="root_daum_roughmap root_daum_roughmap_landing"></div>
    </section>
  );
}

export default SceneMap;
