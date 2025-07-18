import { useEffect, useRef, useState } from "react";

// 누적 스크롤 거리 계산 훅
function useAccumulatedScrollDistanceWithHistory() {
  const [accumulated, setAccumulated] = useState(0);
  const prevY = useRef(window.scrollY);
  const history = useRef<
    {
      timestamp: string;
      scrollValue: number;
      largeArray: Date[];
    }[]
  >([]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setAccumulated((prev) => {
        const next = prev + Math.abs(currentY - prevY.current);

        history.current.push({
          timestamp: new Date().toISOString(),
          scrollValue: next,
          largeArray: new Array(50000).fill(new Date()),
        });
        return next;
      });
      prevY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { accumulated, historyLength: history.current.length };
}

function ScrollDistance() {
  const { accumulated, historyLength } =
    useAccumulatedScrollDistanceWithHistory();
  return (
    <div className="fixed top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg z-[1000] font-bold text-[10px]">
      누적 스크롤: {accumulated.toLocaleString()}px / 기록 개수:{" "}
      {historyLength.toLocaleString()}
    </div>
  );
}

export default ScrollDistance;
