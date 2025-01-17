// components
import Navbar from "../components/Navbar.jsx";
import Slider from "../components/Slider.jsx";
import SliderProds from "../components/SliderProds.jsx";

//hooks
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { FaBagShopping } from "react-icons/fa6";
import { GrLinkNext } from "react-icons/gr";
import { BiLoaderCircle } from "react-icons/bi";

import api from "../services/api.js";

// style
import classes from "./Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);

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
        <div>
          <Slider />
        </div>
        <h2>Mais pedidos</h2>
        <div className={classes.prod_container}>
          {data.length == 0 && <BiLoaderCircle className={classes.spinner} />}
          {data.length > 0 &&
            data.slice(0, 5).map((prod) => (
              <div className={classes.prod_box} key={prod.ID_PRODUTO}>
                <img src={prod.FOTO} alt={prod.NOME} />
                <h2>{prod.NOME}</h2>
                <p className={classes.description}>{prod.DESCRICAO}</p>
                <p className={classes.price}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(prod.PRECO)}
                </p>
              </div>
            ))}
        </div>
        <Link to={"/cardapio"} onClick={goUp}>
          Confira nosso cardápio <GrLinkNext />
        </Link>

        <SliderProds />
      </div>
    </>
  );
};

export default Home;
