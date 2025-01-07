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

const ProdVitrine = ({ filter }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    let fdt;

    switch (filter) {
      case "todos":
        setFilteredData(data);
        break;

      case "BG":
        fdt = data.filter((item) => item.TIPO == "BG");
        setFilteredData(fdt);
        break;

      case "AC":
        fdt = data.filter((item) => item.TIPO == "AC");
        setFilteredData(fdt);
        break;

      case "DK":
        fdt = data.filter((item) => item.TIPO == "DK");
        setFilteredData(fdt);
        break;

      default:
        break;
    }
  }, [filter, data]);

  return (
    <div className={classes.prodVitrine_container}>
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
              <button className="btn btn-cart" onClick={() => saveOrder(prod)}>
                <FaBagShopping />
                <span>Adicionar</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProdVitrine;
