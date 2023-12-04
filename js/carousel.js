
// Função para buscar dados da API e adicionar banners ao carousel
function loadCarousel(){
    url = `${urlBase}/highlights?_expand=albuns`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const carouselIndicators = document.getElementById('carouselIndicators');
        const carouselInner = document.getElementById('carouselInner');

        // Para cada item, criar um indicador e um banner no carousel
        data.forEach((item, index) => {
            
            // Criar indicador
            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-bs-slide-to', index.toString());
            if (index === 0) {
                indicator.classList.add('active');
            }

            carouselIndicators.appendChild(indicator);

            // Criar o banner
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if(index === 0){
                carouselItem.classList.add('active');
            }

            const banner = `
                <a href="./album.html?id=${item.albuns.id}">
                    <img src="${item.albuns.cover_url}" class="object-fit-cover border rounded d-block w-100 item-carousel-topo" alt="${item.albuns.title}">
                    <div class="carousel-caption d-none d-md d-md-block">
                        <h5>${item.albuns.title}</h5>
                    </div>
                </a>
            `;

            carouselItem.innerHTML = banner;
            carouselInner.appendChild(carouselItem);

        });
    })
}

loadCarousel();