import { Swiper, SwiperSlide } from "swiper/react";

// images
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img4 from "../images/img4.jpg";
import img6 from "../images/img6.jpg";

import classes from "./Slider.module.css";

const Slider = () => {
  const images = [
    { id: "1", image: img1 },
    { id: "3", image: img4 },
    { id: "2", image: img2 },
    { id: "4", image: img6 },
  ];

  return (
    <div className={classes.slider_container}>
      <Swiper
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
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
