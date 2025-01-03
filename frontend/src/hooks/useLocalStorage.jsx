// buscar itens
const useGetProductsLs = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  return products;
};

// salvar itens
const useSaveProductsLs = (prod) => {
  const products = useGetProductsLs();
  const check =
    products.filter((item) => item.ID_PRODUTO == prod.ID_PRODUTO)[0] || "";

  if (products.length == 0 || check.ID_PRODUTO !== prod.ID_PRODUTO) {
    prod.QTD = 1;
    prod.VL_TOTAL = prod.PRECO * prod.QTD;

    products.push(prod);
  } else if (products.length > 0 && check.ID_PRODUTO == prod.ID_PRODUTO) {
    check.QTD = check.QTD + 1;

    check.VL_TOTAL = check.PRECO * check.QTD;
  }

  localStorage.setItem("products", JSON.stringify(products));
};

// deletar itens
const useDeleteProductsLs = (prodId, setOrders) => {
  const products = useGetProductsLs();

  const newProducts = products.filter((prod) => prod.ID_PRODUTO !== prodId);

  setOrders(newProducts);

  localStorage.setItem("products", JSON.stringify(newProducts));
};

// limpar carrinho
const useClearProductsLs = () => {
  localStorage.removeItem("products");
};

export {
  useGetProductsLs,
  useSaveProductsLs,
  useDeleteProductsLs,
  useClearProductsLs,
};
