// components
import Navbar from "../components/Navbar.jsx";
import ProdVitrine from "../components/ProdVitrine.jsx";

// hooks
import { useState } from "react";

import classes from "./Cardapio.module.css";

const Cardapio = () => {
  const [filter, setFilter] = useState("todos");

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.menu_container}>
        <h1 className={classes.title}>Nosso Cardápio</h1>
        <p className={classes.subtitle}>
          Clique em adicionar para colocar os produtos na sacola de compras. Se
          preferir, você pode pedir pelo nosso WhatsApp: (21) 98123-3465
        </p>
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
        </div>
      </div>
      <ProdVitrine filter={filter} />
    </>
  );
};

export default Cardapio;
