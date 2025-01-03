// hooks
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetMenu } from "../hooks/useShowMenu";
import { useClearProductsLs } from "../hooks/useLocalStorage.jsx";
import useToast from "../hooks/useToast.jsx";

// api
import api from "../services/api.js";

// context
import { CartContext } from "../context/CartContext.jsx";

// style
import classes from "./Checkout.module.css";

const Checkout = () => {
  // remover menu navbar
  useSetMenu(false);

  // validar somente números
  const numValidator = (e) => {
    const num = e.keyCode || e.which;

    if (
      (num > 47 && num < 58) ||
      (num > 7 && num < 19) ||
      (num > 36 && num < 41)
    ) {
      return true;
    } else {
      e.preventDefault();
    }
  };

  const navigate = useNavigate();

  // context
  const { totalCart, dadosCart } = useContext(CartContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");

  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  // Enviar pedido ao banco de dados
  const sendOrder = (e) => {
    e.preventDefault();

    const dataObj = {
      ID_USUARIO: 1,
      NOME: nome,
      EMAIL: email,
      FONE: fone,
      ENDERECO: endereco,
      BAIRRO: bairro,
      CIDADE: cidade,
      TOTAL: totalCart,
      ITENS: dadosCart,
    };

    api
      .post("/pedidos", dataObj)
      .then(() => {
        useClearProductsLs();
        useToast("sucesso", "Pedido enviado!");
        navigate("/historico");
      })
      .catch(() => {
        useToast("erro", "Não foi possível enviar o pedido.");
      });
  };

  return (
    <div className={classes.checkout_container}>
      <h1>Finalizar Pedido</h1>

      <form onSubmit={sendOrder} className={classes.body_checkout}>
        <div className={classes.box_container}>
          <h3>Dados Pessoais</h3>

          <div className={classes.box_input}>
            <label>
              <span>Nome Completo</span>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                required
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
            </label>

            <label>
              <span>E-mail</span>
              <input
                type="email"
                placeholder="ex: usuario@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>

            <label>
              <span>Celular</span>
              <input
                type="text"
                placeholder="ex: 21983746536"
                maxLength={11}
                onKeyDown={(e) => numValidator(e)}
                required
                onChange={(e) => setFone(e.target.value)}
                value={fone}
              />
            </label>
          </div>
        </div>

        <div className={classes.box_container}>
          <h3>Endereço de Entrega</h3>

          <div className={classes.box_input}>
            <label>
              <span>Endereço</span>
              <input
                type="text"
                placeholder="Digite seu endereço"
                required
                onChange={(e) => setEndereco(e.target.value)}
                value={endereco}
              />
            </label>

            <label>
              <span>Bairro</span>
              <input
                type="text"
                placeholder="Digite seu bairro"
                required
                onChange={(e) => setBairro(e.target.value)}
                value={bairro}
              />
            </label>

            <label>
              <span>Cidade</span>
              <input
                type="text"
                placeholder="Nome da sua Cidade"
                required
                onChange={(e) => setCidade(e.target.value)}
                value={cidade}
              />
            </label>
          </div>
        </div>

        <div className={classes.box_container}>
          <h3>Dados do Pagamento</h3>

          <div className={classes.checkout_values}>
            <p>Total</p>
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalCart)}
            </p>
          </div>
          <button type="submit" className="btn-checkout">
            Finalizar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
