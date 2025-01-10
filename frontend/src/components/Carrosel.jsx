// hooks
import { useState, useEffect } from "react";

import { GrPrevious, GrNext } from "react-icons/gr";
// style
import classes from "./Carrosel.module.css";

const Carrosel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setIndex((prevIndex) => (prevIndex - 1) % images.length);
  };

  return (
    <div className={classes.carrosel_container}>
      <GrPrevious onClick={goToPrev} className={classes.btn} />
      <img src={images[index]} alt="carrosel" className={classes.images} />
      <GrNext onClick={goToNext} className={classes.btn} />
    </div>
  );
};

export default Carrosel;
