import { Swiper, SwiperSlide } from "swiper/react";

interface SwipeViewProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  initialIndex: number;
}

export default function SwipeView({
  isOpen,
  onClose,
  photos,
  initialIndex,
}: SwipeViewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white text-2xl z-50"
        onClick={onClose}
        aria-label="닫기"
        type="button">
        x
      </button>
      <Swiper
        initialSlide={initialIndex}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides
        loop
        className="w-full max-w-md">
        {photos.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`이미지 ${i}`}
              className="w-full rounded-lg object-contain max-h-[80vh] mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
