let now = new Date();
function formatDate() {
  const days = [
    `SUNDAY`,
    `MONDAY`,
    `TUESDAY`,
    `WEDNESDAY`,
    `THURSDAY`,
    `FRIDAY`,
    `SATURDAY`
  ];
  let currentTime = document.querySelector("#time");
  let currentDay = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, 0);
  currentTime.innerHTML = `${currentDay} ${hour}:${minute}`;
}
formatDate();

const search = function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = searchInput.value;
};
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTempF(event) {
  event.preventDefault();
  let displayTempF = document.querySelector("#temp");
  displayTempF.innerHTML = 77;
}
let convertToF = document.querySelector("#fahrenheit-link");
convertToF.addEventListener("click", showTempF);

function showTempC(event) {
  event.preventDefault();
  let displayTempC = document.querySelector("#temp");
  displayTempC.innerHTML = 25;
}

let convertToC = document.querySelector("#celsius-link");
convertToC.addEventListener("click", showTempC);

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  var apiKey = "f21f507f77a6e604db19e8cfe3ef2eb1";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  var apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
var currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
