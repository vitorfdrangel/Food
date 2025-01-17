import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import api from "../services/api.js";

import classes from "./SliderProds.module.css";

const SliderProds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Erro ao carregar produtos");
      });
  }, []);

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
              <p className={classes.description}>{prod.DESCRICAO}</p>
              <h2>{prod.NOME}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderProds;
