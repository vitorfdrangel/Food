import { useState } from "react";
import { Link } from "react-router-dom";

// components
import Cart from "./Cart";

import logo from "../images/logo.png";

// style
import classes from "./Navbar.module.css";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarStyle, setNavbarStyle] = useState(classes.navbar_container);

  // show
  document.addEventListener("showNavbar", () => {
    setShowNavbar(true);
  });

  // close
  document.addEventListener("closeNavbar", () => {
    setShowNavbar(false);
  });

  document.addEventListener("scroll", () => {
    if (scrollY > 0) {
      setNavbarStyle(classes.navbar_container_mv);
    } else {
      setNavbarStyle(classes.navbar_container);
    }
  });

  return (
    <div className={navbarStyle}>
      <Link to={"/"} className={classes.logo}>
        <img src={logo} alt="Logotipo" />
      </Link>

      {showNavbar && (
        <div className={classes.menu}>
          <Link to={"/"}>Início</Link>
          <Link to={"/cardapio"}>Cardápio</Link>
          <button className="btn btn-red" onClick={() => setOpenSidebar(true)}>
            <MdOutlineShoppingBag />
            <p>Sacola</p>
          </button>
        </div>
      )}

      <Cart openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

export default Navbar;
