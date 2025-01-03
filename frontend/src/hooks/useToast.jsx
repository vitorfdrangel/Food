import { toast } from "react-toastify";

const useToast = (result, msg) => {
  if (result == "sucesso") {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      pauseOnFocusLoss: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
  } else if (result == "erro") {
    toast.error(msg, {
      position: "top-center",
      autoClose: 1500,
      pauseOnFocusLoss: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
  }
};

export default useToast;
