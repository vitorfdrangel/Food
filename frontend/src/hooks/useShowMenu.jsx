export const useSetMenu = (arg) => {
  if (arg) {
    const evShow = new CustomEvent("showMenu");
    if (window.focus) {
      dispatchEvent(evShow);
    }
  } else {
    const evClose = new CustomEvent("closeMenu");
    if (window.focus) {
      dispatchEvent(evClose);
    }
  }
};
