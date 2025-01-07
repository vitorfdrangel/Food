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
        <div className={classes.filter_container}>
          <button onClick={() => setFilter("todos")}>Todos</button>
          <button onClick={() => setFilter("BG")}>Hambúrgueres</button>
          <button onClick={() => setFilter("AC")}>Acompanhamentos</button>
          <button onClick={() => setFilter("DK")}>Bebidas</button>
        </div>
      </div>
      <ProdVitrine filter={filter} />
    </div>
  );
};

export default Home;
