const url =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";
const proxy = "https://noroffcors.herokuapp.com/";

const corsUrl = proxy + url;

const resultsContainer = document.querySelector(".results");

async function getGames() {
  try {
    const response = await fetch(corsUrl);
    const gamesResults = await response.json();
    const games = gamesResults.results;

    resultsContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (i === 8) {
        break;
      }

      const name = games[i].name;

      let ratingOfGame = "No ratings yet";

      if (games[i].rating) {
        ratingOfGame = "Rating: " + games[i].rating;
      }

      let numberOfTags = "";

      if (games[i].tags.length) {
        numberOfTags = "Number of tags: " + games[i].tags.length;
      }

      resultsContainer.innerHTML += `<div class="result">
     <h2>${name}</h2>
       <ul>
        <li>${ratingOfGame}</li>
        <li>${numberOfTags}</li>
       </ul>
    </div>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = displayError(
      "An error occurred when calling the API"
    );
  }
}
getGames();

// function displayError is placed in js/displayError.js

// function displayError(message = "Oh no! An error occurred.") {
//   return `<div class="error">${message}</div>`;
// }
