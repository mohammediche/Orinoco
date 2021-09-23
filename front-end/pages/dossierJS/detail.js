const id = new URLSearchParams(window.location.search).get("key");
const ContenuDetail = document.querySelector(".mainClass");
// const testAjout = document.querySelector(".coordonnées");

/*******************Fetch + ajout des données de mon article***********************/
/*******Avec methode Async & await, le code vas s'exécuter de maniére "asynchrone" ********/
const getData = async () => {
  try {
    const res = await fetch(
      // j'attends les données avant de les mettre au format .json
      "http://localhost:3000/api/teddies/" + id
    ); /**Pour selectionner le bon article (objet) grace à l'ID*/
    const final = await res.json();
    // console.log(final); //objet
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
                           `<option class="choixCouleur1" value = ${couleur}>${couleur}</option>`
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
  } catch (erreur) {
    alert(erreur);
  }
};
window.addEventListener("DOMContentLoaded", () => getData());
/************ nombre de cliques sur le bouton "Ajouter au panier"**********/
const maFonctionAjout = () => {
  let production = localStorage.getItem("production");
  // console.log(typeof clickStorage); //Type String
  production = parseInt(production);
  // console.log(typeof clickStorage); //Transform Type number

  // S'il y a deja des produits enregistré dans local storage
  if (production) {
    localStorage.setItem("production", production + 1);
    document.querySelector(".ajout-numero-panier").textContent = production + 1;

    // S'IL N'Y A PAS des produits enregistré dans local storage
  } else {
    localStorage.setItem("production", 1);
    document.querySelector(".ajout-numero-panier").textContent = 1;
  }
};

/*--------------------------------- Ma fonction Ajout du bon article -----------------------------------*/
const product = (mesArticles) => {
  let panier = localStorage.getItem("articleChoix");
  panier = JSON.parse(panier);
  //JSON.parse c'est pour convertir les données au format JSON string qui sont dans le locale storage en objet js.
  // JSON.stringify pour convretir objet js au format JSON string
  if (panier != null) {
    if (panier[mesArticles._id] == undefined) {
      //quand on ajoute un deuxiéme différent article, ca affiche erreur
      panier = {
        ...panier, // les articles déja disponible, tu les laisse et tu en rajoute celui d'en dessous
        [mesArticles._id]: mesArticles, // l'article ajouté *
      };
    }
    panier[mesArticles._id].quantité++;

    // pour la couleur
    panier[mesArticles._id].selectedColor = getColors();
  } else {
    panier = { [mesArticles._id]: mesArticles };
  }
  mesArticles.quantité = 1;
  mesArticles.selectedColor = getColors();
  localStorage.setItem("articleChoix", JSON.stringify(panier));
};

/*---------------------------------Ma fonction totalPrix-----------------------------------------*/
const totalPrix = (monPrix) => {
  let prixTotal = localStorage.getItem("totalPrixArticle");
  let newPrice = monPrix;
  // console.log(typeof newPrice); //string
  // console.log(typeof newPrice); //string
  prixTotal = parseInt(prixTotal);
  newPrice = parseInt(newPrice);
  if (prixTotal) {
    localStorage.setItem("totalPrixArticle", prixTotal + newPrice);
  } else {
    localStorage.setItem("totalPrixArticle", newPrice);
  }
};
/*----------------------------------------- couleur ---------------------------------------*/
const getColors = () => {
  return document.querySelector(".select").value;
};
