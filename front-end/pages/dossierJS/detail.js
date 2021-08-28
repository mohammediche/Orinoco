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
/************ nombre de cliques sur le bouton "Ajouter au panier"**********/
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
const product = (mesArticles) => {
  let productArticle = localStorage.getItem("articleChoix");
  productArticle = JSON.parse(productArticle);
  //JSON.parse c'est pour convertir les données au format JSON qui sont dans le locale storage en objet js.

  if (productArticle != null) {
    if (productArticle[mesArticles._id] == undefined) {
      productArticle = {
        ...productArticle,
        [mesArticles._id]: mesArticles,
      };
    }
    productArticle[mesArticles._id].quantité++;
  } else {
    productArticle = { [mesArticles._id]: mesArticles };
  }
  mesArticles.quantité = 1;
  localStorage.setItem("articleChoix", JSON.stringify(productArticle));
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
