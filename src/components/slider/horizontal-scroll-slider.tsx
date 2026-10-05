"use client";

import { useRef, useState } from "react";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardDestination from "../card-destination/card-destination";
import ArrowBtn from "../ui/arrow-btn/arrow-btn";

export type SliderItem = {
  title: string;
  categories: string[];
  counts: number[];
  imgLink: string;
};

export type SliderData = {
  sliderData: SliderItem[];
};

const HorizontalScrollSlider: React.FC<SliderData> = ({ sliderData }) => {
  const [_, setInit] = useState<boolean>();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          1280: { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          0: { slidesPerView: 1, spaceBetween: 16 },
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={() => setInit(true)}
        className="py-4"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.title}>
            <CardDestination
              imgLink={slide.imgLink}
              size="lg"
              title={slide.title}
              extraSmallText={slide.categories
                .map((cat, i) => `${slide.counts[i]} ${cat}`)
                .join(" · ")}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Left / Right Arrow Buttons */}
      <ArrowBtn
        direction="left"
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <ArrowBtn
        direction="right"
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default HorizontalScrollSlider;
