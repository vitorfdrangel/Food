// components
import Navbar from "../components/Navbar.jsx";

// style
import classes from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Navbar showMenu={true} />
      <div className={classes.home_container}>Home</div>
    </>
  );
};

export default Home;
