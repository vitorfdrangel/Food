// components
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
