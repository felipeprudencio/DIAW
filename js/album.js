const urlBase = "https://jsonserver-trabalho-diaw-v3--prudenciofpdc.repl.co";

async function renderDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

    const album = await fetchAlbumDetails(albumId);
    updateAlbumDetails(album);
}

async function fetchAlbumDetails(albumId){
    try{
        const response = await fetch(`${urlBase}/albuns/${albumId}?_embed=photos`);
        const data =  await response.json();
        return data;
    } catch(error){
        console.error('Erro ao buscas os dados: ', error);
    }
}

function updateAlbumDetails(album){
    if(album){
        document.getElementById('albumName').textContent = album.title;
        document.getElementById('albumImage').src = album.cover_url;
        document.getElementById('albumDescription').textContent = album.description;
        document.getElementById('albumLat').textContent = album.location[0];
        document.getElementById('albumLong').textContent = album.location[1];
        document.getElementById('albumDate').textContent = album.date;
        
        /*
        if(album.photos && album.photos.lenght > 0){
            renderPhotos(album.photos)
        }
        */
        
    } else {
        alert('Produto não encontrado');
    }
}

let idDestaque = null;

async function initiateCheckbox(){

    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
    const checkbox = document.getElementById('highlight');

    try {
        const response = await fetch(`${urlBase}/highlights?albunsId=${albumId}`);
        const data = await response.json();
        setHighlight(data, checkbox);
    }catch (error){
        console.error('Albúm não é destaque', error);
    }

    checkbox.addEventListener('change', function(event) {
        if(event.target.checked){
            addHighlight();
            console.log('Checkbox está marcado!');
        }else {
            removeHighlight();
            console.log('Checkbox está desmarcado!');
        }
    });
}

function setHighlight(highlights, checkbox){
    if(highlights && highlights[0]){
        checkbox.checked = true;
        idDestaque = highlights[0].id;
    }
}

function addHighlight(){
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');
    idDestaque = albumId;

    const url = `${urlBase}/highlights`;
    const data = {albunsId: parseInt(albumId)};
    const request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };
    fetch(url, request).then((response) => {
        console.log(response);
    });
    return true;
}

function removeHighlight(){
    const url = `${urlBase}/highlights/${idDestaque}`;
    const request = {method: "DELETE"};
    fetch(url, request).then((response) => {
        console.log(response);
    });
    return true;
}


renderDetails();
initiateCheckbox();

/* Render Cards */

// Função que renderiza um card
function renderCard(albuns) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-md-3";
    cardDiv.innerHTML = `
<div class="card">
  <img src="${albuns.url}" class="card-img-top object-fit-cove" >
  <div class="card-body">
  <p class="card-text text-truncate">${albuns.description}</p>
  <a href="#" class="btn btn-primary btn-card">Ver Detalhes</a>
</div>
</div>
    `;

    return cardDiv;
}

// Função que renderiza a página
async function renderPage() {
    const cardContainer = document.getElementById("card-container-album");

    const products = await fetchProducts();
    console.log(products.length);

    for (let i = 0; i < products.length; i++) {
        const card = renderCard(products[i]);
        cardContainer.appendChild(card);
    }

}

// Função que busca detalhes do produto no data json
async function fetchProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

    const response = await fetch(`${urlBase}/photos?albunsId=${albumId}`);
    const data = await response.json();
    return data;

}

renderPage();