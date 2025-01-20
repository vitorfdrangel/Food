// hooks
import { useEffect, useState } from "react";
import { useSaveProductsLs } from "../hooks/useLocalStorage";

import useToast from "../hooks/useToast.jsx";

// api
import api from "../services/api.js";

// style
import classes from "./ProdVitrine.module.css";
import { FaBagShopping } from "react-icons/fa6";

import { BiLoaderCircle } from "react-icons/bi";

const ProdVitrine = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("todos");

  // Listar Produtos
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

  // Salvar pedido
  const saveOrder = (prod) => {
    useSaveProductsLs(prod);

    useToast("sucesso", "Produto adicionado!");
  };

  // filtrar produtos
  useEffect(() => {
    let fProds;

    switch (filter) {
      case "todos":
        setFilteredData(data);
        break;

      case "BG":
        fProds = data.filter(
          (item) => item.TIPO == "BG" || item.TIPO == "BG_CK"
        );
        setFilteredData(fProds);
        break;

      case "AC":
        fProds = data.filter((item) => item.TIPO == "AC");
        setFilteredData(fProds);
        break;

      case "DK":
        fProds = data.filter((item) => item.TIPO == "DK");
        setFilteredData(fProds);
        break;

      case "SB":
        fProds = data.filter((item) => item.TIPO == "SB");
        setFilteredData(fProds);
        break;
    }
  }, [filter, data]);

  return (
    <div className={classes.prodVitrine_container}>
      <div className={classes.filter_container}>
        {data.length !== 0 && (
          <div className={classes.filter_container}>
            <button
              onClick={() => setFilter("todos")}
              className={filter === "todos" ? classes.target : ""}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("BG")}
              className={filter === "BG" ? classes.target : ""}
            >
              Hambúrgueres
            </button>
            <button
              onClick={() => setFilter("AC")}
              className={filter === "AC" ? classes.target : ""}
            >
              Acompanhamentos
            </button>
            <button
              onClick={() => setFilter("DK")}
              className={filter === "DK" ? classes.target : ""}
            >
              Bebidas
            </button>
            <button
              onClick={() => setFilter("SB")}
              className={filter === "SB" ? classes.target : ""}
            >
              Sobremesas
            </button>
          </div>
        )}
      </div>
      <div className={classes.prod_container}>
        {data.length === 0 && <BiLoaderCircle className={classes.spinner} />}
        {data.length !== 0 &&
          filteredData.map((prod) => (
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
    </div>
  );
};

export default ProdVitrine;
