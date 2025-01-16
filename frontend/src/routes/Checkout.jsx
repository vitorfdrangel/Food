// components
import Navbar from "../components/Navbar.jsx";

// hooks
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClearProductsLs } from "../hooks/useLocalStorage.jsx";
import useToast from "../hooks/useToast.jsx";

// api
import api from "../services/api.js";

// context
import { CartContext } from "../context/CartContext.jsx";

// style
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [money, setMoney] = useState(false);
  const [troco, setTroco] = useState(false);

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
        navigate("/");
      })
      .catch(() => {
        useToast("erro", "Não foi possível enviar o pedido.");
      });
  };

  const handlePayment = (e) => {
    if (e.target.id == "dinheiro") {
      setMoney(true);
    } else if (e.target.id == "cartao") {
      setMoney(false);
      setTroco(false);
    }
  };

  return (
    <>
      <Navbar showMenu={false} />
      <div className={classes.checkout_container}>
        <h1>Finalizar Pedido</h1>

        <form onSubmit={sendOrder} className={classes.body_checkout}>
          <div className={classes.box_container}>
            <h2>Dados Pessoais</h2>

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
            <h2>Endereço de Entrega</h2>

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
            <h2>Dados do Pagamento</h2>
            <div className={classes.payment}>
              <p>Escolha a forma de pagamento:</p>
              <div className={classes.box_payment}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    id="dinheiro"
                    onClick={(e) => handlePayment(e)}
                  />
                  <span>Dinheiro</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    id="cartao"
                    onClick={(e) => handlePayment(e)}
                  />
                  <span>Cartão</span>
                </label>
              </div>

              {money && (
                <div className={classes.box_troco}>
                  <p>Precisa de troco?</p>
                  <div className={classes.box_payment}>
                    <label>
                      <input
                        type="radio"
                        name="troco"
                        id="sim"
                        onClick={() => setTroco(true)}
                      />
                      <span>Sim</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="troco"
                        id="nao"
                        onClick={() => setTroco(false)}
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </div>
              )}

              {troco && (
                <div className={classes.troco}>
                  <input
                    type="text"
                    placeholder="ex: 50"
                    onKeyDown={(e) => numValidator(e)}
                  />
                </div>
              )}
            </div>

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
    </>
  );
};

export default Checkout;
