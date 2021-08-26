/**il suit le nombre selectionnée dans le local storage (dans le refraiche) */
const SpanPanierNumber = () => {
  let clickStorage = localStorage.getItem("production");
  if (clickStorage) {
    document.querySelector(".ajout-numero-panier").textContent = clickStorage;
  }
};
SpanPanierNumber();
