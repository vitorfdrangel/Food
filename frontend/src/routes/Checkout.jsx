// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProductsLs,
  useClearProductsLs,
} from "../hooks/useLocalStorage.jsx";
import useToast from "../hooks/useToast.jsx";
import { setNavbar } from "../hooks/useEvent.jsx";

// api
import api from "../services/api.js";

// style
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [dadosCart, setDadosCart] = useState([]);
  const [totalCart, setTotalCart] = useState();
  const [showMoney, setShowMoney] = useState(false);
  const [payment, setPayment] = useState("");
  const [showTroco, setShowTroco] = useState(false);
  const [troco, setTroco] = useState("");

  // esconder menu navbar
  setNavbar("close");

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

  // navigate
  const navigate = useNavigate();

  // get produtos
  useEffect(() => {
    const prodsLs = useGetProductsLs();

    let smTotal = 0;

    if (prodsLs.length != 0) {
      prodsLs.map((order) => {
        const price = order.PRECO * order.QTD;

        smTotal = smTotal + price;
      });
    }

    setDadosCart(prodsLs);
    setTotalCart(smTotal);
  }, []);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");

  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  // Enviar pedido ao banco de dados
  const handleSubmit = (e) => {
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
      PAGAMENTO: payment,
      TROCO: troco,
      ITENS: dadosCart,
    };

    api
      .post("/pedidos", dataObj)
      .then(() => {
        useClearProductsLs();
        useToast("sucesso", "Pedido enviado!");
        navigate("/");
        window.scrollTo({ top: 0 });
      })
      .catch(() => {
        useToast("erro", "Não foi possível enviar o pedido.");
      });
  };

  // setar forma de pagamento
  const handlePayment = (e) => {
    if (e.target.id == "dinheiro") {
      setShowMoney(true);
      setPayment("Dinheiro");
    } else if (e.target.id == "cartao") {
      setShowMoney(false);
      setShowTroco(false);
      setTroco("");
      setPayment("Cartão");
    }
  };

  // setar troco
  const handleTroco = (arg) => {
    if (arg) {
      setShowTroco(true);
    } else {
      setShowTroco(false);
      setTroco("");
    }
  };

  return (
    <>
      <div className={classes.checkout_container}>
        <h1>Finalizar Pedido</h1>

        <form onSubmit={handleSubmit} className={classes.body_checkout}>
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

              {showMoney && (
                <div className={classes.box_troco}>
                  <p>Precisa de troco?</p>
                  <div className={classes.box_payment}>
                    <label>
                      <input
                        type="radio"
                        name="troco"
                        id="sim"
                        onClick={() => handleTroco(true)}
                      />
                      <span>Sim</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="troco"
                        id="nao"
                        onClick={() => handleTroco(false)}
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </div>
              )}

              {showTroco && (
                <div className={classes.troco}>
                  <input
                    type="text"
                    placeholder="ex: 50"
                    maxLength={5}
                    onKeyDown={(e) => numValidator(e)}
                    onChange={(e) => setTroco(e.target.value)}
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
