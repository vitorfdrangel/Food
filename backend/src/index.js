import express from "express";
import cors from "cors";
import routeProduto from "./routes/routeProduto.js";
import routePedido from "./routes/routePedido.js";

const app = express();

app.use(express.json());
app.use(cors());

// rotas
app.use(routeProduto);
app.use(routePedido);

app.listen(3000, () => {
  console.log("Servidor online na porta 3000");
});
