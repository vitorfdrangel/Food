// components
import Navbar from "../components/Navbar.jsx";
import Carrosel from "../components/Carrosel.jsx";

//hooks
import { useState, useEffect } from "react";

import { FaBagShopping } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";

import api from "../services/api.js";

// images
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.jpg";

// style
import classes from "./Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);

  const images = [img1, img2, img3, img4, img5, img6];

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

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.home_container}>
        <div>
          <Carrosel images={images} />
        </div>
        <h2>Os mais pedidos</h2>
        <div className={classes.prod_container}>
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
                <div>
                  <button
                    className="btn btn-cart"
                    onClick={() => saveOrder(prod)}
                  >
                    <FaBagShopping />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <p>Confira nosso Cardápio</p>
      </div>
    </>
  );
};

export default Home;
