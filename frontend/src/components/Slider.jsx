import { Swiper, SwiperSlide } from "swiper/react";

// images
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";

import classes from "./Slider.module.css";

const Slider = () => {
  const images = [
    { id: "1", image: img1 },
    { id: "3", image: img2 },
    { id: "2", image: img3 },
    { id: "4", image: img4 },
  ];

  return (
    <div className={classes.slider_container}>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        style={{
          "--swiper-navigation-color": "#fff",
        }}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt="Slider" className={classes.slide_item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
