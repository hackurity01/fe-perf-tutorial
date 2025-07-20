import React from "react";

export interface ImageSource {
  src: string;
  format: "webp" | "jpeg" | "jpg" | "png" | "avif";
  media?: string;
}

interface Picture2Props {
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  sources: {
    [format in "webp" | "jpeg" | "jpg" | "png" | "avif"]?: {
      [originalWidth: number]: string;
    };
  };
  fallbackSrc: string;
}

function Picture2({
  sources,
  fallbackSrc,
  alt = "",
  style = {},
  className = "",
  onClick,
}: Picture2Props) {
  return (
    <div style={style} className={className}>
      <picture>
        {Object.entries(sources).map(([format, srcByDpr]) => (
          <source
            key={`${format}`}
            srcSet={Object.entries(srcByDpr)
              .map(([originalWidth, src]) => `${src} ${originalWidth}w`)
              .join(", ")}
            type={`image/${format}`}
          />
        ))}
        <img src={fallbackSrc} alt={alt} onClick={onClick} />
      </picture>
    </div>
  );
}

export default Picture2;
