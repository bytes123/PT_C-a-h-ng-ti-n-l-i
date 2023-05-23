import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper as Slider, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Swiper() {
  return (
    <Slider
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
    >
      <SwiperSlide className="h-[380px]">
        <img
          className="object-cover w-100"
          src="https://queenpack.com.vn/wp-content/uploads/2021/11/banner-queenpack-01.jpeg"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="h-[380px]">
        <img
          className="object-cover w-100"
          src="https://caylahoa.com/wp-content/uploads/2019/09/banner-banh-trung-thu-tiem-an-ba-zu.jpg"
          alt=""
        />
      </SwiperSlide>
    </Slider>
  );
}
