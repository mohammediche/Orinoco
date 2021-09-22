/**il suit le nombre selectionnée dans le local storage (dans le refraiche) */
const SpanPanierNumber = () => {
  let production = localStorage.getItem("production");
  if (production) {
    document.querySelector(".ajout-numero-panier").textContent = production;
  }
};
SpanPanierNumber();
