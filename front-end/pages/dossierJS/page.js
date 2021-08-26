/******Fetch avec methode Then *******/
/*fetch("http://localhost:3000/api/teddies")
  .then((res) => {
    return res.json();
  })
  .then((resultats) => {
    console.log(resultats);
  })
  .catch((erreur) => {
    console.log(erreur);
  });*/
/*******Avec methode Async & await ********/
const contenu = document.querySelector(".contenu");
const recuperation = async () => {
  let url = "http://localhost:3000/api/teddies";
  const reponse = await fetch(url);
  const resultats = await reponse.json();
  console.log(resultats);
  let carte = "";
  resultats.forEach((resultat) => {
    carte += `
    <article class= "mini-contenu">
    <a href="./front-end/pages/detailPage.html?key=${resultat._id}">
               <img class="tailleImg" src=${resultat.imageUrl}>
               <h2>${resultat.name}</h2>
               <p>${resultat.description}</p>
               <span>${resultat.price / 100 + " €"}</span> 
    </a> 
    </article>                   
    `;
  });
  contenu.innerHTML = carte;
};
window.addEventListener("DOMContentLoaded", () => recuperation());
