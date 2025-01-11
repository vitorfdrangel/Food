// components
import Footer from "./components/Footer";

// slider
import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

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
