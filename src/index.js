function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-element");
  let cityElement = document.querySelector("#city-name-search");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-Form");
searchFormElement.addEventListener("submit", searchCity);
