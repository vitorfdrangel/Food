import { useState, useEffect } from "react";

import { GrPrevious, GrNext } from "react-icons/gr";

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

  useEffect(() => {
    setInterval(goToNext, 3500);
  }, []);

  return (
    <div className={classes.carrosel_container}>
      <GrPrevious onClick={goToPrev} className={classes.btn} />
      <img
        src={images[currentIndex]}
        alt="carrosel"
        className={classes.images}
      />
      <GrNext onClick={goToNext} className={classes.btn} />
    </div>
  );
};

export default Carrosel;
