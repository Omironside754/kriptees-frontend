import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import the autoplay CSS
import { Pagination, Autoplay } from 'swiper';
import { Link } from "react-router-dom";

const FeaturedSlider = ({ products }) => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000, // Slide change delay in milliseconds (3 seconds)
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
        modules={[Pagination, Autoplay]} // Include the Autoplay module
        className=""
      >
        {products.map((product) => {
          const { _id, images, name, price } = product;
          return (
            <SwiperSlide key={_id} className="">
              <Link to={`/product/${_id}`}>
                <img src={images[0].url} alt={name} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default FeaturedSlider;
