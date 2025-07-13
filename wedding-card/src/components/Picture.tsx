import React from "react";

interface PictureProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Picture({
  src,
  alt = "",
  style = {},
  className = "",
  onClick,
}: PictureProps) {
  return (
    <div style={style} className={className}>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}
