let totalPrixRemerciement = document.querySelector(".totalPrixRemerciement");
let afficheOrderId = document.querySelector(".afficheOrderId");

const remerciement = () => {
  /*--------- AffichePrixTotal ----------*/
  let AffichePrixTotal = localStorage.getItem("totalPrixArticle");
  //console.log(typeof AffichePrixTotal); //string
  AffichePrixTotal = JSON.parse(AffichePrixTotal);
  //console.log(typeof AffichePrixTotal); //number
  if (AffichePrixTotal) {
    let template = `
      ${AffichePrixTotal} €   
      `;
    totalPrixRemerciement.innerHTML = template;
  }
  /*--------- AfficheOrderId ----------*/
  let AfficheOrderId = localStorage.getItem("orderId");
  if (AfficheOrderId) {
    let templateOrder = `
          ${AfficheOrderId}
      `;
    afficheOrderId.innerHTML = templateOrder;
  }
  localStorage.clear(); // vider le localeStorage
  localStorage.setItem("articleChoix", JSON.stringify({}));
};
remerciement();
