// components
import ProdVitrine from "../components/ProdVitrine.jsx";

import { setNavbar } from "../hooks/useEvent.jsx";

import classes from "./Cardapio.module.css";

const Cardapio = () => {
  // mostrar menu navbar
  setNavbar("show");
  return (
    <>
      <div className={classes.cardapio_container}>
        <h1 className={classes.title}>Nosso Cardápio</h1>
        <p className={classes.subtitle}>
          Clique em adicionar para colocar os produtos na sacola de compras. Se
          preferir, você pode pedir pelo nosso WhatsApp: (21) 99999-9999
        </p>
      </div>
      <ProdVitrine />
    </>
  );
};

export default Cardapio;
