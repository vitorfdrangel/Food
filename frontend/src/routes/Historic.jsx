// components
import Navbar from "../components/Navbar.jsx";

// hooks
import { useEffect, useState } from "react";

// api
import api from "../services/api.js";

// style
import classes from "./Historic.module.css";

const Historic = () => {
  const [hist, setHist] = useState([]);

  // get histórico
  useEffect(() => {
    api
      .get("/pedidos")
      .then((res) => {
        setHist(res.data);
      })
      .catch((err) => {
        alert("Erro ao carregar histórico de pedidos");
      });
  }, []);

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.historic_container}>
        <h1>Histórico de Pedidos</h1>
        {hist.length == 0 && <h3>Você não tem pedidos!</h3>}
        {hist.length != 0 && (
          <table className={classes.table_historic}>
            {hist.map((order) => (
              <tbody key={order.ID_PEDIDO}>
                <td>
                  <strong>{order.ID_PEDIDO}</strong>
                </td>
                <td className={classes.date_hist}>{order.DT_PEDIDO}</td>
                <td className={classes.value_hist}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.TOTAL)}
                </td>
              </tbody>
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default Historic;
