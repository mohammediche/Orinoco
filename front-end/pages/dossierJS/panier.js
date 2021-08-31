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
      <tr>
         <td class = "image-title-center">
         <button class = "bouton-icon-poubelle" title = "Supprimer cet article?" onclick = deleteArticle("${article._id}")><i class="fas fa-trash-alt"></i></button>
           <img class = "imagePanierJs" src =${article.imageUrl}></img>
           ${article.name}
         </td>

         <td>${article.selectedColor}</td>

         <td>
            <button class="boutonPlusMoins bouton-moins" onclick= NombreArticleMoins("${article._id}")>-</button>
            ${article.quantité}
            <button class="boutonPlusMoins" onclick= NombreArticlePlus("${article._id}")>+</button>
         </td>
         <td>${price} €</td> 
      </tr>
      `;
    });
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
const NombreArticlePlus = (id) => {
  let productArticle = JSON.parse(localStorage.getItem("articleChoix"));
  let articlesPrix = localStorage.getItem("totalPrixArticle");
  articlesPrix = parseInt(articlesPrix);
  //console.log(typeof articlesPrix);
  let clickStorage = localStorage.getItem("production");
  clickStorage = parseInt(clickStorage);
  if (clickStorage) {
    localStorage.setItem("production", clickStorage + 1);
    document.querySelector(".ajout-numero-panier").textContent =
      clickStorage + 1;
  }

  productArticle[id].quantité++;
  articlesPrix = productArticle[id].price / 100 + articlesPrix;

  localStorage.setItem("totalPrixArticle", JSON.stringify(articlesPrix));
  localStorage.setItem("articleChoix", JSON.stringify(productArticle));
  location.reload();
};
/*--------------------------- bouton moins - qui sert a supprimer 1 article -------------------------*/
const NombreArticleMoins = (id) => {
  let articlesPrix = localStorage.getItem("totalPrixArticle");
  let productArticle = JSON.parse(localStorage.getItem("articleChoix"));
  articlesPrix = parseInt(articlesPrix);
  //console.log(typeof articlesPrix);
  let clickStorage = localStorage.getItem("production");
  clickStorage = parseInt(clickStorage);
  if (clickStorage) {
    localStorage.setItem("production", clickStorage - 1);
    document.querySelector(".ajout-numero-panier").textContent =
      clickStorage - 1;
  }

  productArticle[id].quantité--;
  let priceVariable = productArticle[id].price / 100;
  articlesPrix = articlesPrix - priceVariable;

  /* condition quantité 1 minimum */
  // if (productArticle[id].quantité === 1) {
  //   document.querySelector(".bouton-moins").disabled = true;
  // }

  localStorage.setItem("totalPrixArticle", JSON.stringify(articlesPrix));
  localStorage.setItem("articleChoix", JSON.stringify(productArticle));
  location.reload();
};
const deleteArticle = (id) => {
  //JSON.parse c'est pour convertir les données au format JSON qui sont dans le locale storage en objet js.
  let productArticle = JSON.parse(localStorage.getItem("articleChoix"));
  let clickStorage = JSON.parse(localStorage.getItem("production"));
  let articlesPrix = JSON.parse(localStorage.getItem("totalPrixArticle"));
  let newquantité = productArticle[id].quantité;
  let newprix = productArticle[id].price / 100;
  console.log(newprix);
  localStorage.setItem(
    "totalPrixArticle",
    JSON.stringify(articlesPrix - newprix)
  );

  localStorage.setItem(
    "production",
    JSON.stringify(clickStorage - newquantité)
  );

  delete productArticle[id]; /* supprimer l'article */

  localStorage.setItem("articleChoix", JSON.stringify(productArticle));
  location.reload();
};
