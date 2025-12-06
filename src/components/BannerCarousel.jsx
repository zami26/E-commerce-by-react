import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const BannerCarousel = () => {
  const banners = [
    "banner1.jpg",
    "banner2.png",
    "banner4.jpg",
    "banner5.jpg",
    "banner4.jpg",
  ];

  return (
    <div className="banner-carousel">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              style={{
                width: "100%",
                height: "650px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
