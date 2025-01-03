import { createContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [dadosCart, setDadosCart] = useState({});
  const [totalCart, setTotalCart] = useState();

  return (
    <CartContext.Provider
      value={{ totalCart, setTotalCart, dadosCart, setDadosCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
