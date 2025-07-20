import React from "react";

interface PictureProps {
  src: string;
  jpg?: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Picture({
  src,
  jpg,
  alt = "",
  style = {},
  className = "",
  onClick,
}: PictureProps) {
  return (
    <div style={style} className={className}>
      <picture>
        <source srcSet={src} type="image/webp" />
        <source srcSet={jpg} type="image/jpeg" />
        <img src={src} alt={alt} onClick={onClick} />
      </picture>
    </div>
  );
}
