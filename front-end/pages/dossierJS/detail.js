const id = new URLSearchParams(window.location.search).get("key");
const ContenuDetail = document.querySelector(".mainClass");

const getData = async () => {
  // let url = "http://localhost:3000/api/teddies" + id; /* +id  */
  const res = await fetch("http://localhost:3000/api/teddies/" + id);
  const final = await res.json();
  const contenuDetailPage = ` 
    <article class="mini-contenu">
      <img src=${final.imageUrl}>
      <div class="paragraphe">
       <h2>${final.name}</h2>
       <p>${final.description}</p>
       <span id="prix">${final.price}</span>
      </div>
           <div class="flexBoutons">
                <div class="miniFlex">
                   <label>Sélectionner la couleur qui vous plaît :</label>
                    <select class="select">
                       <option class="choixCouleur1">${final.colors[0]}</option>
                       <option class="choixCouleur2">${final.colors[1]}</option>
                       <option class="choixCouleur2">${final.colors[2]}</option>
                       <option class="choixCouleur2">${final.colors[3]}</option>
                    </select>  
                 </div>  
                 <div>  
                  <label for="quantité">Quantité</label>
                  <input type="number" class="quantité" id="quantité" value="1" min="1" max="10">
                </div>                   
           </div>
               <button class="panier" type="submit">Ajouter au panier</button>

    </article>
    `;
  ContenuDetail.innerHTML = contenuDetailPage;
};

window.addEventListener("DOMContentLoaded", () => getData());
