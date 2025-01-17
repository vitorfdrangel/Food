import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./SliderProds.module.css";

const SliderProds = ({ data }) => {
  return (
    <div className={classes.container}>
      <Swiper
        slidesPerView={4}
        pagination={{ clickable: true }}
        className={classes.swiper}
      >
        {data.slice(0, 7).map((prod) => (
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
