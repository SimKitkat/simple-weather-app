function refreshTemperature(Response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temperature = Response.data.temperature.current;
  let cityElement = document.querySelector("#city-name-search");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let feelElement = document.querySelector("#feel");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#city-current-time");
  let date = new Date(Response.data.time * 1000);
  let dayElement = document.querySelector("#current-day");
  let monthElement = document.querySelector("#current-month-date");
  let yearElement = document.querySelector("#current-year");
  let iconElement = document.querySelector("#weather-app-icon");

  cityElement.innerHTML = Response.data.city;
  tempElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = Response.data.condition.description;
  humidityElement.innerHTML = Response.data.temperature.humidity;
  feelElement.innerHTML = Response.data.temperature.feels_like;
  windElement.innerHTML = Response.data.wind.speed;
  timeElement.innerHTML = formatTime(date);
  dayElement.innerHTML = formatDay(date);
  monthElement.innerHTML = formatMonthDate(date);
  yearElement.innerHTML = formatYear(date);
  iconElement.innerHTML = `<img src="${Response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecastWeather(Response.data.city);
}

function formatDay(date) {
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let today = days[date.getDay()];
  return `${today}`;
}
function formatMonthDate(date) {
  let month = date.getMonth();
  let currentDate = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthly = months[date.getMonth()];
  return `${monthly} ${currentDate}`;
}

function formatYear(date) {
  let year = date.getFullYear();
  return `${year}`;
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecastWeather(city) {
  let apiKey = "8b0a6ad4348ba4af0cb7ofe7df4t6b19";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(Response) {
  console.log(Response.data);
  let forecastHtml = "";

  Response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div ><img src="${
          day.condition.icon_url
        } "class="weather-forecast-icon"/></div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast-week");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("windhoek");
