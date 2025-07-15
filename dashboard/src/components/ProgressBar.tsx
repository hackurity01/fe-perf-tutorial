import React, { useEffect, useRef } from "react";

interface ProgressBarProps {
  value: number;
  width?: number;
  className?: string;
}

function ProgressBar({ value, width = 80, className }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      // Reset to 0 first for animation
      barRef.current.style.width = "0%";
      // Trigger reflow for transition
      void barRef.current.offsetWidth;
      barRef.current.style.width = `${value}%`;
    }
  }, [value]);

  return (
    <div
      style={{ width }}
      className={`relative h-4 bg-blue-100 rounded ${className ?? ""}`.trim()}>
      <div
        ref={barRef}
        className="absolute left-0 top-0 h-4 bg-blue-500 rounded transition-all duration-700"
        style={{ width: 0 }}></div>
      <span className="absolute left-1 top-0 text-xs text-white z-10">
        {value}
      </span>
    </div>
  );
}

export default ProgressBar;
