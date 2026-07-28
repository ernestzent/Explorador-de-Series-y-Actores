/* =======================================================
   LÓGICA DEL MENU DESPLEGABLE
   ======================================================= */

const header = document.querySelector("header");
const menuIcon = header.lastElementChild;
const sidebar = document.querySelector(".sidebar__nav");
const closeSidebar = document.getElementById("close-icon");

menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("is-active");
})

closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("is-active");
})

/* =======================================================
   LÓGICA DE LA BÚSQUEDA DE SERIES
   ======================================================= */

const createShowCard = (show) => {
    const card = document.createElement("article");
    card.classList.add("movie-card");

    const imageUrl = show.image ? show.image.medium : 'https://via.placeholder.com/210x330?text=Sin+Imagen';
    const rating = show.rating && show.rating.average ? `⭐ ${show.rating.average}` : '⭐ N/A';

    card.innerHTML = `
        <img src="${imageUrl}" alt="Póster de ${show.name}" class="movie-card__poster">
        <div class="movie-card__info">
            <h3 class="movie-card__title" title="${show.name}">${show.name}</h3>
            <span class="movie-card__rating">${rating}</span>
            <button class="movie-card__btn" data-id="${show.id}">Ver detalles</button>
        </div>
    `;

    return card;
};

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesGrid = document.getElementById('movies-grid'); 

const fetchShows = async (query) => {
    try {
        moviesGrid.innerHTML = `
            <div class="results__placeholder">
                <p>Buscando resultados para "${query}"...</p>
            </div>
        `;

        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = response.data;

        moviesGrid.innerHTML = '';

        if (data.length === 0) {
            moviesGrid.innerHTML = `
                <div class="results__placeholder">
                    <p>No se encontraron resultados para "${query}". Intenta con otro término.</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const showCard = createShowCard(item.show);
            moviesGrid.appendChild(showCard);
        });

    } catch (error) {
        console.error("Error en la petición a TVMaze:", error);
        moviesGrid.innerHTML = `
            <div class="results__placeholder">
                <p>Ocurrió un error al conectar con el servidor. Inténtalo más tarde.</p>
            </div>
        `;
    }
};

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const query = searchInput.value.trim();

        if (query) {
            fetchShows(query);
        }
    });
}

/* =======================================================
   LÓGICA DE LA BÚSQUEDA DE ACTORES
   ======================================================= */

const createPersonCard = (person) => {
    const card = document.createElement("article");
    card.classList.add("movie-card");

    const imageUrl = person.image ? person.image.medium : 'https://via.placeholder.com/210x330?text=Sin+Foto';
    const country = person.country ? person.country.name : 'Desconocido';
    card.innerHTML = `
        <img src="${imageUrl}" alt="Foto de ${person.name}" class="movie-card__poster">
        <div class="movie-card__info">
            <h3 class="movie-card__title" title="${person.name}">${person.name}</h3>
            <span class="movie-card__rating">🌎 País: ${country}</span>
            <button class="movie-card__btn" data-person-id="${person.id}">Ver detalles</button>
        </div>
    `;
    return card;
};

const personSearchForm = document.getElementById('person-search-form');
const personSearchInput = document.getElementById('person-search-input');
const peopleGrid = document.getElementById('people-grid');

const fetchPeople = async (query) => {
    try  {
        peopleGrid.innerHTML = `
            <div class="results__placeholder">
                <p>Buscando actores con el nombre "${query}"...</p>
            </div>
        `;

        const response = await axios.get(`https://api.tvmaze.com/search/people?q=${query}`);
        const data = response.data;

        peopleGrid.innerHTML = '';

        if (data.length === 0) {
            peopleGrid.innerHTML = `
                <div class="results__placeholder">
                    <p>No se encontró a nadie llamado "${query}". Intenta de nuevo.</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const personCard = createPersonCard(item.person);
            peopleGrid.appendChild(personCard);
        });

    } catch (error) {
        console.error("Error al buscar personas:", error);
        peopleGrid.innerHTML = `
            <div class="results__placeholder">
                <p>Ocurrió un error de conexión. Inténtalo más tarde.</p>
            </div>
        `;
    }
};

if (personSearchForm) {
    personSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = personSearchInput.value.trim();
        if (query) {
            fetchPeople(query);
        }
    });
}


/* =======================================================
   LÓGICA DEL MODAL DE DETALLES
   ======================================================= */

const modal = document.getElementById('details-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

const closeModal = () => {
    modal.classList.remove('is-active');
    modalBody.innerHTML = '';
};

if (modal) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
}

document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.movie-card__btn');
    
    if (!btn) return;

    const showId = btn.getAttribute('data-id');
    const personId = btn.getAttribute('data-person-id');

    modal.classList.add('is-active');
    modalBody.innerHTML = '<p style="text-align:center; color: white;">Cargando detalles...</p>';

    try {
        if (showId) {
            const response = await axios.get(`https://api.tvmaze.com/shows/${showId}?embed=cast`);
            const show = response.data;
            
            const imageUrl = show.image ? show.image.original : 'https://via.placeholder.com/300x450?text=Sin+Imagen';
            const genres = show.genres.length > 0 ? show.genres.join(', ') : 'Sin clasificar';
            
            modalBody.innerHTML = `
                <div class="details-layout">
                    <img src="${imageUrl}" alt="${show.name}">
                    <div class="details-info">
                        <h2>${show.name}</h2>
                        <span class="badge">${genres} | ⭐ ${show.rating.average || 'N/A'}</span>
                        <p><strong>Estreno:</strong> ${show.premiered || 'Desconocido'}</p>
                        <p><strong>Estado:</strong> ${show.status}</p>
                        <h3>Sinopsis</h3>
                        <!-- TVMaze devuelve la sinopsis ya con etiquetas HTML, así que se renderiza directo -->
                        ${show.summary || '<p>No hay sinopsis disponible.</p>'}
                    </div>
                </div>
            `;
        } 
        else if (personId) {
            const response = await axios.get(`https://api.tvmaze.com/people/${personId}`);
            const person = response.data;

            const imageUrl = person.image ? person.image.original : 'https://via.placeholder.com/300x450?text=Sin+Foto';
            const country = person.country ? person.country.name : 'Desconocido';
            const birthday = person.birthday ? person.birthday : 'Desconocida';

            modalBody.innerHTML = `
                <div class="details-layout">
                    <img src="${imageUrl}" alt="${person.name}">
                    <div class="details-info">
                        <h2>${person.name}</h2>
                        <span class="badge">🌎 ${country}</span>
                        <p><strong>Fecha de nacimiento:</strong> ${birthday}</p>
                        <p><strong>Género:</strong> ${person.gender || 'No especificado'}</p>
                        <!-- TVMaze no ofrece mucha bio, pero podemos agregar enlaces -->
                        <a href="${person.url}" target="_blank" class="btn__accent" style="display:inline-block; margin-top: 1rem; padding: 0.5rem 1rem; border-radius: 5px; text-decoration: none; color: black; background: #66FCF1;">Ver perfil en TVMaze</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error obteniendo detalles:", error);
        modalBody.innerHTML = '<p style="text-align:center; color: #ef4444;">Error al cargar la información.</p>';
    }
});

/* =======================================================
   LÓGICA DE LA PÁGINA DE SERIES
   ======================================================= */

const loadSeries = async () => {
    const seriesGrid = document.getElementById('series-grid');
    
    if (!seriesGrid) return;

    try {
        seriesGrid.innerHTML = `
            <div class="results__placeholder">
                <p>Cargando series destacadas...</p>
            </div>
        `;

        const response = await axios.get("https://api.tvmaze.com/shows");
        const series = response.data.slice(0, 40);

        seriesGrid.innerHTML = '';

        series.forEach(show => {
            const showCard = createShowCard(show);
            seriesGrid.appendChild(showCard);
        });

    } catch (error) {
        console.error("Error fetch:", error);
        seriesGrid.innerHTML = `
            <div class="results__placeholder">
                <p style="color: #ef4444;">Error al cargar el catálogo. Intenta de nuevo más tarde.</p>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadSeries();
});