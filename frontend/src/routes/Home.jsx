// components
import Navbar from "../components/Navbar.jsx";
import Slider from "../components/Slider.jsx";
import SliderProds from "../components/SliderProds.jsx";

//hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { GrLinkNext } from "react-icons/gr";
import { BiLoaderCircle } from "react-icons/bi";

import api from "../services/api.js";

// style
import classes from "./Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);

  // melhores bgs
  const bestFilter = data.filter(
    (item) => item.TIPO === "BG" || item.TIPO === "BG_CK"
  );

  // bg bovino
  const bovFilter = data.filter((item) => item.TIPO === "BG");

  // bg frango
  const franFilter = data.filter((item) => item.TIPO === "BG_CK");

  // listar produtos
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

  const goUp = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.home_container}>
        <Slider />

        {data.length === 0 && <BiLoaderCircle className={classes.spinner} />}
        {data.length !== 0 && (
          <div>
            <div>
              <h2>Mais pedidos</h2>
              <SliderProds data={bestFilter} n1={3} n2={-2} />
            </div>
            <div>
              <h2>Hambúrgueres de carne bovina</h2>
              <SliderProds data={bovFilter} />
            </div>
            <div>
              <h2>Hambúrgueres de frango</h2>
              <SliderProds data={franFilter} />
            </div>
          </div>
        )}
        <Link to={"/cardapio"} onClick={goUp}>
          Confira nosso cardápio <GrLinkNext />
        </Link>
      </div>
    </>
  );
};

export default Home;
