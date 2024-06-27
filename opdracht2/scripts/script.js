// JavaScript Document


/////////////////////
// swiper carousel //
/////////////////////


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,

  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  
  navigation: {
   nextEl: ".swiper-button-next",
   prevEl: ".swiper-button-prev",
  },
  
  breakpoints: {
   0: {
     slidesPerView: 1,
     spaceBetween: 10,
   },
   608: {
     slidesPerView: 2,
     spaceBetween: 20,
   },
   812: {
     slidesPerView: 3,
     spaceBetween: 20,
   },
   1116: { 
     slidesPerView: 4,
     spaceBetween: 20,
   },
 },
});



///////////////////////////
// favorieten slide menu //
///////////////////////////


const menuButton = document.querySelector('.hartje-header');
const slideMenu = document.querySelector('.favs-slide-menu');
const closeMenuButton = document.querySelector("[close-favorieten]");
const overlay = document.querySelector('.overlay');



function openMenu() {
  slideMenu.classList.add('open');
  overlay.classList.add('open');
}

function closeMenu() {
  slideMenu.classList.remove('open');
  overlay.classList.remove('open');
}

function onKeyPress(event) {
  if (event.key == "Escape") {
      closeMenu();
  }
}


menuButton.addEventListener('click', openMenu);
closeMenuButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu );

document.addEventListener('keydown', onKeyPress );



//////////////////
// dialog popup //
//////////////////


const openButton = document.querySelectorAll("[data-open-modal]")
const closeButton = document.querySelectorAll("[data-close-modal]")


openButton.forEach(button => {
button.addEventListener("click", () => {
  const modalId = button.getAttribute("data-id");
  const modal = document.getElementById(modalId);
  modal.showModal()
})
})

closeButton.forEach(button => {
button.addEventListener("click", () => {
  const modal = button.closest("dialog"); // is een button en zoekt in de parent naar de dichtsbijzijnde dialog tag. Die dialog word dan gesloten. //
  modal.close()
})
})




//////////////////////////////
// movies naar lijst sturen //
//////////////////////////////

// Selecteer alle hartjes buttons met deze class 
const deFaveButtons = document.querySelectorAll('.add-to-favs');


// Selecteer de ul in de favorieten slide lijst 
const deLijst = document.querySelector("aside ul");


// selecteer de span waar het aantal in word getoond
const itemCountSpan = document.querySelector('.hartje-header .item-count');


// functie aanmaken om het aantal li's op te tellen en de text in de span te updaten
function updateItemCount() {
  const itemCount = deLijst.children.length;
  itemCountSpan.textContent = itemCount;
}




function removeFromList(event) {

  // Button waarop is geklikt
  const deButton = event.target;

  // vind de dichtsbijzijnde li element van die button 
  const deCard = deButton.closest("li");


  // Get the data-id attribute van de kopie card
  const dataID = deCard.dataset.id;

  // zoek de matching card in de orginele swiper lijst, d.m.v de data-id 
  const deOriginalCard = document.querySelector("main li[data-id='" + dataID + "']");

  // Verwijder de 'added-to-list' class van de orginele card 
  deOriginalCard.classList.remove('added-to-list')

  // Verwijder de card 
  deCard.remove();

  updateItemCount();
}  



function addToList(event) {


const deButton = event.target;

const deCard = deButton.closest("li");

// kijken of de card al in de lijst staat (heeft hij de class "added-to-list"?)
if ((deCard.classList.contains("added-to-list"))){
  // Zo ja? Verwijder uit de lijst
  
  // Get the data-id attribute van de orginele card
  const dataID = deCard.dataset.id;
  
  // zoek de matching card in de favorieten lijst, d.m.v de data-id 
  const deCardInLijst = document.querySelector("aside li[data-id='" + dataID + "']");
  
  // Verwijder de card uit de favorieten lijst
  deCardInLijst.remove();

  updateItemCount();


} else {
  // als het nog niet de class ".added-to-list" heeft, wordt er een kopie gemaakt van de carden toegevoegd aan de lijst
      
  // kopie maken van de card
  const deClone = deCard.cloneNode(true);
  
  // vind de button in de kopie card 
  const deCloneButton = deClone.querySelector("button");
  
   // voeg event listener toe aan de button in de kopie card 
  deCloneButton.addEventListener("click", removeFromList);
  
  // stuur de kopie van de card naar de favorieten lijst
  deLijst.appendChild(deClone);

  updateItemCount();
  
}
  
   // Toggle de ".added-to-list" class op de originele card
  deCard.classList.toggle("added-to-list");
}

// Voeg een event Listerner toe aan elke hartjes button en zet de functie hierop 
deFaveButtons.forEach(deButton => {
  deButton.addEventListener("click", addToList);
})



