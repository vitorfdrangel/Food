import { useState } from "react";

import classes from "./Carrosel.module.css";

const Carrosel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={classes.carrosel_container}>
      <button onClick={goToPrev}>Anterior</button>
      <img
        src={images[currentIndex]}
        alt="carrosel"
        className={classes.images}
      />
      <button onClick={goToNext}>Próximo</button>
    </div>
  );
};

export default Carrosel;
