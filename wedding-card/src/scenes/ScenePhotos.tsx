// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "swiper/css";

import { lazy, Suspense, useEffect, useState } from "react";
import { Text } from "../components/Text";

import photo1 from "../assets/imgs/photo-1.webp";
import photo2 from "../assets/imgs/photo-2.webp";
import photo3 from "../assets/imgs/photo-3.webp";
import photo4 from "../assets/imgs/photo-4.webp";
import photo5 from "../assets/imgs/photo-5.webp";
import photo6 from "../assets/imgs/photo-6.webp";

const SwipeView = lazy(() => import("../components/SwipeView"));
let isSwiperViewLoaded = false;

const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

export default function ScenePhotos() {
  const [swiperOpen, setSwiperOpen] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);

  useEffect(() => {
    if (isSwiperViewLoaded) return;
    isSwiperViewLoaded = true;
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        import("../components/SwipeView");
      });
    } else {
      setTimeout(() => {
        import("../components/SwipeView");
      }, 1);
    }
  }, []);

  return (
    <section className="relative z-[1000] py-[90px] max-w-[500px] mx-auto">
      <Text
        text="우리들의 사진"
        color="#000"
        noShadow
        className="text-2xl text-center block"
      />
      <div className="pt-[60px] px-5 w-full mx-auto mb-[40px] box-border">
        <div className="grid grid-cols-2 gap-6">
          {photos.map((src, i) => (
            <div
              key={i}
              className="w-full flex justify-center aspect-square overflow-hidden cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
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

      <Suspense fallback={<div>Loading...</div>}>
        {swiperOpen && (
          <SwipeView
            onClose={() => setSwiperOpen(false)}
            photos={photos}
            initialIndex={swiperIndex}
          />
        )}
      </Suspense>
    </section>
  );
}
