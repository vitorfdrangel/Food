import { Router } from "express";
import { db, query } from "../config/database.js";

const routePedido = Router();

// Listando pedidos
routePedido.get("/pedidos", (req, res) => {
  db.all(
    "select ID_PEDIDO, TOTAL, strftime('%d/%m/%Y', DT_PEDIDO) as DT_PEDIDO from PEDIDO",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).send(`Ocorreu um erro: ${err.message}`);
      } else {
        return res.status(200).json(rows);
      }
    }
  );
});

// Inserindo pedido ao banco
routePedido.post("/pedidos", (req, res) => {
  let sql = `insert into PEDIDO(ID_USUARIO, NOME, EMAIL, FONE, ENDERECO, BAIRRO, CIDADE, TOTAL, DT_PEDIDO)
            values(?, ?, ?, ?, ?, ?, ?, ?, current_date)
            returning ID_PEDIDO`;

  let p = req.body;

  db.all(
    sql,
    [
      p.ID_USUARIO,
      p.NOME,
      p.EMAIL,
      p.FONE,
      p.ENDERECO,
      p.BAIRRO,
      p.CIDADE,
      p.TOTAL,
    ],
    async (err, rows) => {
      if (err) {
        return res.status(500).send(`Erro ao salvar pedido: ${err.message}`);
      } else {
        let id_ped = rows[0].ID_PEDIDO;

        // itens do pedido
        const i = req.body.ITENS;

        i.map((item) => {
          sql = `INSERT INTO PEDIDO_ITEM(ID_PEDIDO, ID_PRODUTO, QTD, VL_UNITARIO, VL_TOTAL)
                VALUES(?, ?, ?, ?, ?)`;

          query(sql, [
            id_ped,
            item.ID_PRODUTO,
            item.QTD,
            item.PRECO,
            item.VL_TOTAL,
          ]);
        });

        return res.status(201).json({ ID_PEDIDO: id_ped, ITENS: i });
      }
    }
  );
});

export default routePedido;
