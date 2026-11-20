# Explorador de Series y Actores - TVMaze API (Cinemazee) 🎬

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

¡Hola! 👋 **Explorador de Series y Actores (Cinemazee)** es una aplicación web que consume la **API REST de TVMaze** mediante **Axios** y **Vanilla JavaScript** para realizar búsquedas asíncronas en tiempo real de series de televisión y actores. Cuenta con vistas dedicadas, modales interactivos, renderizado dinámico del DOM y una arquitectura de estilos escalable en Sass.

🔗 **Demo en vivo:** [Ver Cinemazee desplegado](https://cinemazee.netlify.app/)

## ✨ Características Principales

* **Búsqueda Asíncrona en Tiempo Real:** Consumo directo de los endpoints de series y elenco de TVMaze mediante Axios desde `js/function.js`, con manejo de estados de carga y error.
* **Vistas Dedicadas e Interfaz Multipágina:** Navegación estructurada entre la página principal (`index.html`), detalle y catálogo de series (`series.html`) y vista de actores (`actor.html`).
* **Componentes Interactivos:** Incluye menú lateral desplegable (*sidebar*), ventanas modales de detalle, tarjetas dinámicas y formularios de búsqueda.
* **Arquitectura Sass Modular:** Estilos organizados en parciales (`base/`, `components/`, `layouts/`) con mixins, funciones y variables compilados a `main.css`.

## 🛠️ Tecnologías Utilizadas

* **Vanilla JavaScript (ES6+):** Peticiones asíncronas, manipulación dinámica del DOM y control de estados de carga/error (`js/function.js`).
* **Axios:** Cliente HTTP para consultar los endpoints de la API de TVMaze.
* **SASS / CSS3:** Arquitectura modular con parciales (`_variables.scss`, `_mixin.scss`, `_functions.scss`), Flexbox y CSS Grid.
* **HTML5 Semántico:** Estructura multipágina (`index.html`, `series.html`, `actor.html`).
* **TVMaze REST API:** Fuente pública de datos de series, sinopsis y reparto.

## 📂 Estructura del Proyecto

```text
Explorador-de-Series-y-Actores/
├── .vscode/
│   └── settings.json           # Configuración del editor y compilación Sass
├── img/
│   ├── cross.png               # Ícono de cierre (modal/sidebar)
│   ├── logo.png                # Logotipo del proyecto
│   └── menu.png                # Ícono de menú móvil
├── js/
│   └── function.js             # Consumo de TVMaze API con Axios y renderizado DOM
├── styles/
│   ├── base/
│   │   ├── _base.scss          # Reset y estilos generales
│   │   ├── _functions.scss     # Funciones personalizadas de Sass
│   │   ├── _mixin.scss         # Mixins reutilizables y media queries
│   │   └── _variables.scss     # Paleta de colores, fuentes y espaciados
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _catalog.scss
│   │   ├── _forms.scss
│   │   ├── _inputs.scss
│   │   ├── _modal.scss
│   │   └── _sidebar.scss
│   ├── layouts/
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   ├── _results.scss
│   │   └── _search.scss
│   ├── main.css                # Hoja de estilos compilada
│   ├── main.css.map            # Mapa de fuentes para depuración CSS
│   └── main.scss               # Archivo principal que importa los parciales
├── actor.html                  # Vista de búsqueda y detalle de actores
├── index.html                  # Página principal del explorador
├── series.html                 # Vista de catálogo y detalle de series
```

## 🚀 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ernestzent/Explorador-de-Series-y-Actores.git
   cd Explorador-de-Series-y-Actores
   ```

2. **Abre el proyecto localmente:**
   * Abre `index.html` directamente en tu navegador, **o**
   * Ejecútalo con la extensión **Live Server** de VS Code para una mejor experiencia al navegar entre vistas y realizar peticiones a la API.

3. **Si deseas editar los estilos Sass (opcional):**
   * Abre el proyecto en VS Code y utiliza la extensión **Live Sass Compiler** (configurada en `.vscode/settings.json`) para recompilar `styles/main.scss` automáticamente hacia `styles/main.css`.

## 💡 Ejemplos de Uso

1. **Buscar Series o Actores:** Desde `index.html`, escribe el nombre de una serie o actor (por ejemplo, *"Breaking Bad"* o *"Pedro Pascal"*) en el buscador para consultar la API de TVMaze en tiempo real.
2. **Explorar Vistas Específicas:** Utiliza el menú de navegación o el *sidebar* móvil para alternar entre `series.html` y `actor.html`.
3. **Ver Detalles en Modal:** Selecciona cualquier tarjeta renderizada para desplegar información ampliada, sinopsis o datos del reparto sin recargar la página.

## 🤝 Contribuciones

¿Tienes ideas para agregar filtros por género, favoritos o paginación?
1. Haz un *Fork* del repositorio.
2. Crea tu rama (`git checkout -b feature/favoritos-localstorage`).
3. Guarda tus cambios (`git commit -m 'Agrega lista de series favoritas'`).
4. Sube tu rama (`git push origin feature/favoritos-localstorage`).
5. Abre un *Pull Request*.
