let produitPanier = document.querySelector(".produitPanier");
let prixTotalPanier = document.querySelector(".prixTotal");

/*----------------- Fonction qui sert a afficher les données dans ma page Panier -----------------*/
const productArticle = () => {
  let carteArticle = localStorage.getItem("articleChoix");
  // console.log(typeof carteArticle); string
  carteArticle = JSON.parse(carteArticle);
  //   console.log(typeof carteArticle); object
  if (carteArticle && produitPanier) {
    let template = "";
    Object.values(carteArticle).map((article) => {
      let price = (article.price / 100) * article.quantité;
      template += `
      <td><img class = "imagePanierJs" src =${article.imageUrl}></img>
      ${article.name}</td>
      <td>couleur à voir avec mon mentor</td>
      <td>
         <button class="boutonPlusMoins" onclick= "NombreArticleMoins()">-</button>
         ${article.quantité}
         <button class="boutonPlusMoins" onclick= "NombreArticlePlus()">+</button>
      </td>
      <td>${price} €</td>

      `;
    });
    // getPrice(article);
    produitPanier.innerHTML = template;
  }
  /*_-------------------  Prix total-----------------------_ */
  let cartePrix = localStorage.getItem("totalPrixArticle");
  // console.log(typeof cartePrix);
  cartePrix = JSON.parse(cartePrix);
  // console.log(typeof cartePrix);
  if (cartePrix && prixTotalPanier) {
    let templatePrix = `
      ${cartePrix} €
      
      `;
    prixTotalPanier.innerHTML = templatePrix;
  }
};

productArticle();
/*--------------------------- bouton plus + qui sert a ajouter 1 article -------------------------*/
const NombreArticlePlus = ()=>{
 
}
/*--------------------------- bouton moins - qui sert a supprimer 1 article -------------------------*/
const NombreArticleMoins = ()=>{
 
}


