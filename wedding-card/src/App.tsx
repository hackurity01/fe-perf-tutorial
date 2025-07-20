import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";
import Scene3 from "./scenes/Scene3";
import Scene4 from "./scenes/Scene4";
import Scene5 from "./scenes/Scene5";
import Scene6 from "./scenes/Scene6";
import Scene7 from "./scenes/Scene7";
import Scene8 from "./scenes/Scene8";
import ScenePhotos from "./scenes/ScenePhotos";
import SceneMap from "./scenes/SceneMap";
import SceneInfo from "./scenes/SceneInfo";
// import ScrollDistance from "./components/ScrollDistance";

function App() {
  const h = typeof window !== "undefined" ? window.innerHeight : 0;

  return (
    <>
      {/* <ScrollDistance /> */}
      <Scene1 height={h} />
      <Scene2 height={2400} />
      <Scene3 height={2400} />
      <Scene4 height={2400} />
      <Scene5 height={1800} />
      <Scene6 height={1800} />
      <Scene7 height={1800} />
      <Scene8 height={2400} />
      <ScenePhotos />
      <SceneMap />
      <SceneInfo />
    </>
  );
}

export default App;
