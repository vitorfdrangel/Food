import { useEffect } from "react";

const showNavbar = new CustomEvent("showNavbar");
const closeNavbar = new CustomEvent("closeNavbar");

export const setNavbar = (set) => {
  useEffect(() => {
    if (window.focus) {
      if (set == "show") {
        document.dispatchEvent(showNavbar);
      } else if (set == "close") {
        document.dispatchEvent(closeNavbar);
      }
    }
  }, []);
};
