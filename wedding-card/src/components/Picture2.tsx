import React, { useState } from "react";

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
  blurSrc?: string;
}

function Picture2({
  sources,
  fallbackSrc,
  blurSrc,
  alt = "",
  style = {},
  className = "",
  onClick,
}: Picture2Props) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

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
        <img
          src={fallbackSrc}
          alt={alt}
          onClick={onClick}
          onLoad={() => setIsImgLoaded(true)}
          style={{
            display: isImgLoaded ? "block" : "none",
          }}
        />
      </picture>
      {!isImgLoaded && (
        <img
          src={blurSrc}
          alt={alt}
          onClick={onClick}
          className="h-full w-full object-cover"
          style={{ filter: "blur(5px)", opacity: 0.8 }}
        />
      )}
    </div>
  );
}

export default Picture2;
