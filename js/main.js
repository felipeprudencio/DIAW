const urlBase = "https://jsonserver-trabalho-diaw-v3--prudenciofpdc.repl.co";

function get_map(){

    const centralLastLong = [-43.934365564512916, -19.93588116371294 ];

    mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBlcHJ1ZGVuY2lvcHVjIiwiYSI6ImNscG9nenRkNzBuaXIycW5qcnF0am84cGEifQ.OVQJiDXaN_0N4PG_ru2zCA';

    const map = new mapboxgl.Map({

        container: 'map', // container ID
        center: centralLastLong, // starting position [lng, lat]
        zoom: 14 // starting zoom

    });

    return map;
}

function get_card_marker(album){
    return `
    <a class="text-decoration-none text-reset"  href="./album.html?id=${album.id}">
        <img src="${album.cover_url}" class="card-img-top" alt="${album.title}"/>
        <div class="card-body">
        <h5 class="card-title text-truncate">${album.title}</h5>
        <p class="card-text">${album.description}</p>
        </div>
    </a>
    `;
}


function get_locations(map){
    const url = `${urlBase}/albuns`;

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((albuns) => {
        albuns.forEach((item) => {

            let popup = new mapboxgl.Popup({ offset: 25}).setHTML(
                get_card_marker(item)
            );

            const marker = new mapboxgl.Marker({color: "blue"})
            .setLngLat(item.location)
            .setPopup(popup)
            .addTo(map);
        });
    });


}

const map = get_map();
get_locations(map);


/* Render Cards */

// Função que renderiza um card
function renderCard(albuns) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-md-3";
    cardDiv.innerHTML = `
<div class="card">
  <img src="${albuns.cover_url}" class="card-img-top object-fit-cove" >
  <div class="card-body">
    <h5 class="card-title text-truncate">${albuns.title}</h5>
    <p class="card-text text-truncate">${albuns.description}</p>
    <a href="./album.html?id=${albuns.id}" class="btn btn-primary btn-card">Saiba Mais</a>
</div>
</div>
    `;

    return cardDiv;
}

// Função que renderiza a página
async function renderPage() {
    const cardContainer = document.getElementById("card-container");

    const products = await fetchProducts();
    console.log(products.length);

    for (let i = 0; i < products.length; i++) {
        const card = renderCard(products[i]);
        cardContainer.appendChild(card);
    }

}

// Função que busca detalhes do produto no data json
async function fetchProducts() {
    const response = await fetch(`${urlBase}/albuns/`);
    const data = await response.json();
    return data;

}

renderPage();