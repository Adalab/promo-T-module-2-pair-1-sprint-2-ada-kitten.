'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');

const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

const GITHUB_USER = 'MariaPeCa';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

const kittenListStored = JSON.parse(localStorage.getItem('kittenDataList'));

//Objetos con cada gatito
const kittenData_1 = {
    image: "https://dev.adalab.es/gato-siames.webp",
    name: "Anastacio",
    desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
    race: "Siamés",
};
const kittenData_2 = {
    image: "https://dev.adalab.es/sphynx-gato.webp",
    name: "Fiona",
    desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
    race: "Sphynx",
};
const kittenData_3 = {
    image: "https://dev.adalab.es/maine-coon-cat.webp",
    name: "Cielo",
    desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
    race: "Maine Coon",
};

//Cambia la constante del listado kittenDataList para que sea una variable y el listado este vacío.
//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];
let kittenDataList = [];

//Modifica la petición al servidor que hiciste en la sesión anterior, para que solo se realice la petición cuando no hay gatitos en el local storage.
if (kittenListStored) {
kittenDataList = kittenListStored //lista gatitos = lista gatitos en el storage
renderKittenList(kittenDataList) //pintamos lista
} else {
    fetch(SERVER_URL)
    .then((response)=> response.json())
    .then((data) => {
    kittenDataList= data.results;
    renderKittenList(kittenDataList)
    localStorage.setItem('kittenDataList' , JSON.stringify(kittenDataList));
    })

    .catch((error) => {
      console.error(error);
    });
}

//Funciones 
/* Primero hacer estructura a HTML y luego pasarla a JS
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}
*/
function renderKitten(kittenData) {
    const liElement = document.createElement('li');
    liElement.classList.add('card');

    const articleElement = document.createElement('article');
    liElement.appendChild(articleElement);

    const imgElement = document.createElement('img');
    imgElement.classList.add('card_img');
    imgElement.src = kittenData.image;
    imgElement.alt = 'gatito';
    articleElement.appendChild(imgElement);

    const h3Element = document.createElement('h3');
    h3Element.classList.add('card_title');
    const h3Content = document.createTextNode(kittenData.name);
    h3Element.appendChild(h3Content);
    articleElement.appendChild(h3Element);

    const h3ElementRace = document.createElement('h3');
    h3ElementRace.classList.add('card_race');
    const h3ContentRace = document.createTextNode(kittenData.race);
    h3ElementRace.appendChild(h3ContentRace);
    articleElement.appendChild(h3ElementRace);

    const DescElement = document.createElement('p');
    DescElement.classList.add('card_description');
    const descContent = document.createTextNode(kittenData.desc);
    DescElement.appendChild(descContent);
    articleElement.appendChild(DescElement);
    
    return liElement;
  }

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        //listElement.innerHTML += renderKitten(kittenItem);
        listElement.appendChild(renderKitten(kittenItem));
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}

//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;

     if (valueDesc === "" || valuePhoto === "" || valueName === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    }
    else if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
        labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
          const newKittenDataObject = {
            image: valuePhoto,
            name: valueName,
            desc: valueDesc,
            race: valueRace,

    }
        kittenDataList.push(newKittenDataObject);
        renderKittenList(kittenDataList);
    }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value.toLowerCase();
    const raceSearchText = input_search_race.value.toLowerCase();
    listElement.innerHTML = "";
    const newFilterKitten = kittenDataList
    .filter ((kitten) => kitten.desc.toLowerCase().includes(descrSearchText))
    .filter ((kitten) => kitten.race.toLowerCase().includes(raceSearchText));
    console.log(newFilterKitten);
    
    renderKittenList(newFilterKitten);
}


//Mostrar el listado de gatitos en el HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);









