import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./SliderProds.module.css";

const SliderProds = ({ data, n1, n2 }) => {
  return (
    <div className={classes.container}>
      <Swiper
        slidesPerView={4}
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
