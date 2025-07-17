// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Text } from "../components/Text";

import photo1 from "../assets/imgs/photos/photo-1.jpg";
import photo2 from "../assets/imgs/photos/photo-2.jpg";
import photo3 from "../assets/imgs/photos/photo-3.jpg";
import photo4 from "../assets/imgs/photos/photo-4.jpg";
import photo5 from "../assets/imgs/photos/photo-5.jpg";
import photo6 from "../assets/imgs/photos/photo-6.jpg";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

export default function ScenePhotos() {
  const [swiperOpen, setSwiperOpen] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);

  return (
    <section className="py-[90px] max-w-[500px] mx-auto">
      <Text
        text="우리들의 사진"
        color="#000"
        className="text-2xl text-center block"
        noShadow
      />
      {/* 썸네일 그리드 */}
      <div className="pt-[60px] px-5 w-full mx-auto mb-[40px] box-border">
        <div className="grid grid-cols-2 gap-6">
          {photos.map((src, i) => (
            <div
              key={i}
              className="w-full flex justify-center aspect-square overflow-hidden"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                setSwiperIndex(i);
                setSwiperOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-[#666] text-[0.78rem] pt-5 text-center">
        *사진을 클릭하시면 크게 볼 수 있어요!
      </div>

      {swiperOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50"
            onClick={() => setSwiperOpen(false)}
            aria-label="닫기"
            type="button">
            ×
          </button>
          <Swiper
            initialSlide={swiperIndex}
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
      )}
    </section>
  );
}
