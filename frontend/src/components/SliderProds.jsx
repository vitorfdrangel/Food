import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./SliderProds.module.css";

const SliderProds = ({ data, n1, n2 }) => {
  const [slidePV, setSlidePV] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidePV(1);
      } else if (window.innerWidth < 1200) {
        setSlidePV(2);
      } else if (window.innerWidth < 1450) {
        setSlidePV(3);
      } else {
        setSlidePV(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.container}>
      <Swiper
        slidesPerView={slidePV}
        pagination={{ clickable: true }}
        className={classes.swiper}
      >
        {data.slice(n1, n2).map((prod) => (
          <SwiperSlide key={prod.ID_PRODUTO}>
            <div className={classes.slider_box}>
              <img src={prod.FOTO} alt={prod.NOME} />
              <h2>{prod.NOME}</h2>
              <p className={classes.description}>{prod.DESCRICAO}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderProds;
