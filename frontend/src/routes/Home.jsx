// components
import Navbar from "../components/Navbar.jsx";

// style
import classes from "./Home.module.css";

const Home = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.home_container}>
        <div className={classes.title}>
          <p>Carrosel com imagens</p>
          <h1>Mais Pedidos</h1>
          <p>Lista de produtos mais pedidos</p>
        </div>
        {<button onClick={handleClick}>Subir</button>}
      </div>
    </>
  );
};

export default Home;
