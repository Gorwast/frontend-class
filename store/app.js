
const apiURL = 'https://65359710c620ba9358ec9353.mockapi.io';
class Game {
  constructor(
    id,
    name,
    description,
    rating,
    categories,
    price,
    players,
    image
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.categories = categories;
    this.price = price;
    this.players = players;
    this.image = image;
  }
}

// Creamos objetos de modelos de casas
const game1 = new Game(
  1,
  "Juego 1",
  "Hermosa casa con vistas panorámicas.",
  3,
  2.5,
  250000,
  1000,
  150,
  "real-estate-1.jpg"
);
const game2 = new Game(
  2,
  "Juego 2",
  "Diseño moderno y espacioso con acabados de lujo.",
  3,
  3.5,
  350000,
  300,
  180,
  "real-estate-2.jpg"
);
const game3 = new Game(
  3,
  "Juego 3",
  "Casa ideal para familias grandes con jardín y areas de convivencia.",
  4,
  4.5,
  450000,
  400,
  200,
  "real-estate-3.jpg"
);

const game4 = new Game(
  4,
  "Juego 4",
  "Buen Juego",
  "R",
  "Open World",
  40,
  "Single Player",
  "game-4.jpg"
);

// Almacenamos los objetos en un array
const gameList = [game1, game2, game3];

//#region VISTA DE LOS MODELOS EN HTML (VIEW)

// Funcion que controla el despliegue de un array de Game en la tabla, asi como el mensaje a mostrar.
function displayTable(games) {

  clearTable();

  showLoadingMessage();

  setTimeout(() => {
    if (games.length === 0) {
      showNotFoundMessage();
    } else {
      hideMessage();

      const tablaBody = document.getElementById("data-table-body");

      const imagePath = `/img/games`;

      games.forEach((game) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td> ${game.id} </td>
              <td> <img src="${imagePath + game.image}" alt="${game.name
          }" width="100"> </td>
              <td>${game.name}</td>
              <td>${game.description}</td>
              <td>${game.rating}</td>
              <td>${game.categories}</td>
              <td>${formatCurrency(game.price)}</td>
              <td>${game.players}</td>
              <td>${game.image}</td>
            `;

        tablaBody.appendChild(row);
      });
    }
  }, 2000);
}

// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById("data-table-body");

  tableBody.innerHTML = "";
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "Cargando...";

  message.style.display = "block";
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "No se encontraron Juegos con el filtro proporcionado.";

  message.style.display = "block";
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById("message");

  message.style.display = "none";
}

//#endregion

//#region FILTROS (VIEW)

// Funcion que inicializa los eventos de los botones del filto
function initButtonsHandler() {
  document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    document
      .querySelectorAll("input.filter-field")
      .forEach((input) => (input.value = ""));
    applyFilters();
  });
}

// Funcion que gestiona la aplicacion del filtro a los datos y su despliegue.
function applyFilters() {
  const filterText = document.getElementById("text").value.toLowerCase();
  const filterrating = parseFloat(document.getElementById("rating").value);
  const filterMinPrice = parseFloat(document.getElementById("price-min").value);
  const filterMaxPrice = parseFloat(document.getElementById("price-max").value);

  const filteredgames = filtergames(
    gameList,
    filterText,
    filterrating,
    filterMinPrice,
    filterMaxPrice
  );

  displayTable(filteredgames);
}

// Funcion con la logica para filtrar las casas.
function filterGames(games, text, rating, minPrice, maxPrice) {
  return games.filter(
    (game) =>
      (!rating || game.rating === rating) &&
      (!minPrice || game.price >= minPrice) &&
      (!maxPrice || game.price <= maxPrice) &&
      (!text ||
        game.name.toLowerCase().includes(text) ||
        game.description.toLowerCase().includes(text))
  );
}

function searchData() {

  const OPTIONS = {
    method: 'GET'
  };

  fetch(`${apiURL}/games`, OPTIONS)
    .then(response => response.json())
    .then(data => {
      // Mapeamos los datos de modelos a objetos de la clase RealEstate.
      gamesList = data.map(item => {

        return new Game(
          item.id,
          item.name,
          item.description,
          item.rating,
          item.categories,
          item.price,
          item.players,
          item.image
        );
      });

      // Mostramos los datos en la vista.
      displayTable(gamesList);

    })
    .catch(error => console.log(error));

}

searchData();

initButtonsHandler();
