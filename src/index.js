function refreshTemperature(Response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temperature = Response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city-name-search");

  cityElement.innerHTML = Response.data.city;
}

function searchCity(city) {
  let apiKey = "8b0a6ad4348ba4af0cb7ofe7df4t6b19";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshTemperature);
}

function cityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-element");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-Form");
searchFormElement.addEventListener("submit", cityName);

searchCity("windhoek");
