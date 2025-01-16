import { createContext, useState } from "react";

import { useGetProductsLs } from "../hooks/useLocalStorage.jsx";

const CartContext = createContext();

// let smTotal = 0;

// if (ordersCart.length != 0) {
//   ordersCart.map((order) => {
//     const price = order.PRECO * order.QTD;

//     smTotal = smTotal + price;
//   });
// }

const CartContextProvider = ({ children }) => {
  const [dadosCart, setDadosCart] = useState([]);
  const [totalCart, setTotalCart] = useState();

  return (
    <CartContext.Provider
      value={{ dadosCart, setDadosCart, totalCart, setTotalCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
