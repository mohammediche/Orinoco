let form = document.querySelector("form");
let produitPanier = document.querySelector(".produitPanier");
let prixTotalPanier = document.querySelector(".prixTotal");

/*----------------- Fonction qui sert a afficher les données dans ma page Panier -----------------*/
const productArticle = () => {
  let panier = localStorage.getItem("articleChoix");
  // console.log(typeof carteArticle); JSON string
  panier = JSON.parse(panier);
  //   console.log(typeof carteArticle); object js
  if (panier && produitPanier) {
    let template = "";
    Object.values(panier).forEach((article) => {
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
  let prixTotal = localStorage.getItem("totalPrixArticle");
  // console.log(typeof cartePrix);
  prixTotal = JSON.parse(prixTotal);
  // console.log(typeof cartePrix);
  if (prixTotal && prixTotalPanier) {
    let templatePrix = `
      ${prixTotal} €
      
      `;
    prixTotalPanier.innerHTML = templatePrix;
  }
};
productArticle();
/*--------------------------- bouton plus + qui sert a ajouter 1 article -------------------------*/
const NombreArticlePlus = (id) => {
  let panier = JSON.parse(localStorage.getItem("articleChoix"));
  let articlesPrix = localStorage.getItem("totalPrixArticle");
  // console.log(typeof articlesPrix); // string
  articlesPrix = parseInt(articlesPrix);
  //console.log(typeof articlesPrix); // Number
  let production = localStorage.getItem("production");
  production = parseInt(production);
  if (production) {
    localStorage.setItem("production", production + 1);
    document.querySelector(".ajout-numero-panier").textContent = production + 1;
  }

  panier[id].quantité++;
  articlesPrix = panier[id].price / 100 + articlesPrix; // prix total

  localStorage.setItem("totalPrixArticle", JSON.stringify(articlesPrix));
  localStorage.setItem("articleChoix", JSON.stringify(panier));
  location.reload();
};
/*--------------------------- bouton moins - qui sert a supprimer 1 article -------------------------*/
const NombreArticleMoins = (id) => {
  let articlesPrix = localStorage.getItem("totalPrixArticle");
  let panier = JSON.parse(localStorage.getItem("articleChoix"));
  articlesPrix = parseInt(articlesPrix);
  //console.log(typeof articlesPrix);
  let production = localStorage.getItem("production");
  production = parseInt(production);
  if (production) {
    localStorage.setItem("production", production - 1);
    document.querySelector(".ajout-numero-panier").textContent = production - 1;
  }
  panier[id].quantité--;
  let priceVariable = panier[id].price / 100;
  articlesPrix = articlesPrix - priceVariable;

  localStorage.setItem("totalPrixArticle", JSON.stringify(articlesPrix));
  localStorage.setItem("articleChoix", JSON.stringify(panier));
  location.reload();
};
/*-------------------------------------- Delete bouton poubelle ----------------------------------*/
const deleteArticle = (id) => {
  //JSON.parse c'est pour convertir les données au format JSON qui sont dans le locale storage en objet js.
  const production = JSON.parse(localStorage.getItem("production"));
  const panier = JSON.parse(localStorage.getItem("articleChoix"));
  const prixTotal = JSON.parse(localStorage.getItem("totalPrixArticle"));
  const quantite = panier[id].quantité;
  const newprix = (panier[id].price * quantite) / 100;
  console.log(newprix);
  localStorage.setItem("totalPrixArticle", JSON.stringify(prixTotal - newprix));

  localStorage.setItem("production", JSON.stringify(production - quantite));

  delete panier[id]; /* supprimer l'article */

  localStorage.setItem("articleChoix", JSON.stringify(panier));
  location.reload();
};

/*---------------- POST request -------------------*/
const createOrder = async (e) => {
  e.preventDefault();
  let produit = [];
  let panier = JSON.parse(localStorage.getItem("articleChoix"));
  // console.log(panier);

  // parcourir le panier
  for (const key in panier) {
    produit.push(key);
  }
  const order = {
    contact: {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.Address.value,
      city: form.city.value,
      email: form.email.value,
    },
    products: produit,
  };
  console.log(order);
  try {
    let result = await fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(order), //on converti order qui est en object en JSON string.
      headers: {
        "Content-Type": "application/json",
      },
    });
    let orderId = (await result.json()).orderId;
    // console.log(orderId);
    localStorage.setItem("orderId", orderId);

    // console.log(result.orderId);
    window.location.replace("merci.html");
  } catch (error) {
    alert = error;
  }
};
form.addEventListener("submit", createOrder);
/*------------------------  show and hide -----------------------------*/
window.onload = () => {
  let panier = JSON.parse(localStorage.getItem("articleChoix"));
  let size = Object.keys(panier).length;
  // console.log(size);
  if (size) {
    document.querySelector(".h2-displey").style.display = "none";
    document.querySelector(".coordonnées").style.display = "block";
    document.querySelector(".section-panier").style.display = "block";
  } else {
    document.querySelector(".h2-displey").style.display = "block";
    document.querySelector(".coordonnées").style.display = "none";
    document.querySelector(".section-panier").style.display = "none";
  }
  // if (size === null) {
  //   return null;
  // }
};
