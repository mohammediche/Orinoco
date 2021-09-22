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
/*******Avec methode Async & await, le code vas s'exécuter de maniére "asynchrone" ********/
const contenu = document.querySelector(".contenu");
const recuperation = async () => {
  let url = "http://localhost:3000/api/teddies";
  try {
    const reponse = await fetch(url); // j'attends les données avant de les mettre au format .json
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
  } catch (erreur) {
    alert(erreur);
  }
};
window.addEventListener("DOMContentLoaded", () => recuperation());
