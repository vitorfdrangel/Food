// hooks
import { useSetMenu } from "../hooks/useShowMenu";

// components
import ProdVitrine from "../components/ProdVitrine";

import classes from "./Home.module.css";

const Home = () => {
  // mostrar menu navbar
  useSetMenu(true);

  return (
    <div>
      <div className={classes.menu_container}>
        <h1 className={classes.title}>Nosso Cardápio</h1>
        <p className={classes.subtitle}>
          Clique em adicionar para colocar os produtos na sacola de compras. Se
          preferir, você pode pedir pelo nosso WhatsApp: (21) 98123-3465
        </p>
      </div>
      <ProdVitrine />
    </div>
  );
};

export default Home;
