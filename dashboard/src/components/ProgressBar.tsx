import { useEffect, useRef } from "react";

interface ProgressBarProps {
  value: number;
  width?: number;
  className?: string;
}

function ProgressBar({ value }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${value / 100})`;
      }
    }, 100);
  }, [value]);

  return (
    <div className="relative h-4 bg-blue-100 rounded w-full">
      <div
        ref={barRef}
        style={{
          transition: "transform 1s ease-in-out",
          transform: "scaleX(0)",
        }}
        className="absolute left-0 top-0 w-full h-4 bg-blue-500 rounded origin-left"
      />
      <span className="absolute left-1 top-0 text-xs text-white z-10">
        {value}
      </span>
    </div>
  );
}

export default ProgressBar;
