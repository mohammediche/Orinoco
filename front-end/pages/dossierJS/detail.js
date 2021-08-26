const id = new URLSearchParams(window.location.search).get("key");
const ContenuDetail = document.querySelector(".mainClass");
/*******************Fetch + ajout des données de mon article***********************/
const getData = async () => {
  const res = await fetch(
    "http://localhost:3000/api/teddies/" + id
  ); /**Pour selectionner le bon article grace à l'ID*/
  const final = await res.json();
  const contenuDetailPage = ` 
    <article class="mini-contenu">
      <img src=${final.imageUrl}>
      <div class="paragraphe">
       <h2>${final.name}</h2>
       <p>${final.description}</p>
       <span id="prix">${final.price / 100 + " €"}</span>
      </div>
           <div class="flexBoutons">
                <div class="miniFlex">
                   <label>Sélectionner la couleur qui vous plaît :</label>
                    <select class="select">
                       ${final.colors.map(
                         (couleur) =>
                           `<option class="choixCouleur1">${couleur}</option>`
                       )}
                    </select>  
                 </div>                    
           </div>
  <button class="panier" type="submit" 
      onclick= "maFonctionAjout();
      totalPrix('${final.price / 100}');
      product(${JSON.stringify(final)
        .split('"')
        .join(
          "&quot;"
        )}); window.location.href = 'panier.html';">Ajouter au panier
      
  </button>

    </article>
    `;
  ContenuDetail.innerHTML = contenuDetailPage;
};
/**********.split = sert a convertir de objet à string **********/
window.addEventListener("DOMContentLoaded", () => getData());
/************ maFonctionAjout pour Clique ajoute au panier**********/
const maFonctionAjout = () => {
  let clickStorage = localStorage.getItem("production");
  // console.log(typeof clickStorage); //Type String
  clickStorage = parseInt(clickStorage);
  // console.log(typeof clickStorage); //Transform Type number

  // S'il y a deja des produits enregistré dans local storage
  if (clickStorage) {
    localStorage.setItem("production", clickStorage + 1);
    document.querySelector(".ajout-numero-panier").textContent =
      clickStorage + 1;

    // S'IL N'Y A PAS des produits enregistré dans local storage
  } else {
    localStorage.setItem("production", 1);
    document.querySelector(".ajout-numero-panier").textContent = 1;
  }
};

/*--------------------------------- Ma fonction Ajout du bon article -----------------------------------*/
const product = (monArticle) => {
  let productArticle = [];
  //JSON.parse c'est pour convertir les données au format JSON qui sont dans le locale storage en objet js.
  let localeArticle = JSON.parse(localStorage.getItem("articleChoix"));

  if (localeArticle) {
    //productArticle = JSON.parse(localStorage.getItem("articleChoix"));
    /*------- si le produit existe déja --------*/
    // 1 - rechercher le produit dans le panier et le retourner s'il existe

    // 2 - Si le produit n'existe pas donc on push le nouveau produit avec quantité 1
    // 3 - reécrire le tableau des produits dans le panier

    // 2-A Si le produit existe:
    // - on incrémente la quantité
    // 3 - reécrire le tableau des produits dans le panier
    // 3-A supprimer le produit du panier
    // 3-B Ajouter le nouveau

    let test = false;
    localeArticle.forEach((article) => {
      if (article._id === monArticle._id) {
        console.log(" plus 1");
        article.quantité++;
      } else {
        // is le produit n'existe pas du tout encore
        // if (monArticle.quantité) { // si c'es sa première ajout
        //   monArticle.quantité++;
        //   localeArticle.push(monArticle);
        // }
        console.log("dans nouveau ajout");
        monArticle.quantité = 1;
        test = true;
        return true;
      }
    });
    if (test) {
      localeArticle.push(monArticle);
      localStorage.setItem("articleChoix", JSON.stringify(localeArticle));
    }
    // localStorage.setItem("articleChoix", JSON.stringify(localeArticle));
  } else {
    monArticle.quantité = 1;
    productArticle.push(monArticle);
    //JSON.stringify c'est pour convertir l'objet js au format JSON.
    localStorage.setItem("articleChoix", JSON.stringify(productArticle));
  }
};

/*---------------------------------Ma fonction totalPrix-----------------------------------------*/
const totalPrix = (monPrix) => {
  let articlePrix = localStorage.getItem("totalPrixArticle");
  let newPrice = monPrix;
  // console.log(typeof newPrice);
  // console.log(typeof articlePrix);
  articlePrix = parseInt(articlePrix);
  newPrice = parseInt(newPrice);
  if (articlePrix) {
    localStorage.setItem("totalPrixArticle", articlePrix + newPrice);
  } else {
    localStorage.setItem("totalPrixArticle", newPrice);
  }
};
