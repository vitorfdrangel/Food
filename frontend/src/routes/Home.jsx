// components
import Navbar from "../components/Navbar.jsx";
import ProdVitrine from "../components/ProdVitrine";

// hooks
import { useState } from "react";

import classes from "./Home.module.css";

const Home = () => {
  const [filter, setFilter] = useState("todos");

  return (
    <div>
      <Navbar showMenu={true} />
      <div className={classes.menu_container}>
        <h1 className={classes.title}>Nosso Cardápio</h1>
        <p className={classes.subtitle}>
          Clique em adicionar para colocar os produtos na sacola de compras. Se
          preferir, você pode pedir pelo nosso WhatsApp: (21) 98123-3465
        </p>
        <div>
          <button className={classes.filter} onClick={() => setFilter("todos")}>
            Todos
          </button>
          <button className={classes.filter} onClick={() => setFilter("BG")}>
            Hambúrgueres
          </button>
          <button className={classes.filter} onClick={() => setFilter("AC")}>
            Acompanhamentos
          </button>
          <button className={classes.filter} onClick={() => setFilter("DK")}>
            Bebidas
          </button>
        </div>
      </div>
      <ProdVitrine filter={filter} />
    </div>
  );
};

export default Home;
