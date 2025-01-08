import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// context
import { CartContextProvider } from "./context/CartContext.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import Home from "./routes/Home.jsx";
import Cardapio from "./routes/Cardapio.jsx";
import Checkout from "./routes/Checkout.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cardapio",
        element: <Cardapio />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextProvider>
      <RouterProvider router={route} />
    </CartContextProvider>
  </StrictMode>
);
