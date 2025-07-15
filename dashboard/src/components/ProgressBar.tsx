import { useEffect, useRef } from "react";

interface ProgressBarProps {
  value: number;
  width?: number;
  className?: string;
}

function ProgressBar({ value }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = "0%";
      setTimeout(() => {
        barRef.current!.style.width = `${value}%`;
      }, 100);
    }
  }, [value]);

  return (
    <div className="relative h-4 bg-blue-100 rounded w-full">
      <div
        ref={barRef}
        className="absolute left-0 top-0 w-0 h-4 bg-blue-500 rounded transition-all duration-1000"
      />
      <span className="absolute left-1 top-0 text-xs text-white z-10">
        {value}
      </span>
    </div>
  );
}

export default ProgressBar;
