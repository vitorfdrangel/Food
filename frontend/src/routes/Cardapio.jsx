// components
import Navbar from "../components/Navbar.jsx";
import ProdVitrine from "../components/ProdVitrine.jsx";

import classes from "./Cardapio.module.css";

const Cardapio = () => {
  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.cardapio_container}>
        <h1 className={classes.title}>Nosso Cardápio</h1>
        <p className={classes.subtitle}>
          Clique em adicionar para colocar os produtos na sacola de compras. Se
          preferir, você pode pedir pelo nosso WhatsApp: (21) 98123-3465
        </p>
      </div>
      <ProdVitrine />
    </>
  );
};

export default Cardapio;
