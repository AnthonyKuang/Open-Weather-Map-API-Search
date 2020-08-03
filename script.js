// DOM Elements
const cityName = document.querySelector('#city');
const stateName = document.querySelector('#state');
const changeLocationBtn = document.querySelector('#change-btn');
const cityLocation = document.querySelector('#location');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temperature');
const icon = document.querySelector('#icon');
const humidity = document.querySelector('#humidity');
const feelsLike = document.querySelector('#feels-like');
const wind = document.querySelector('#wind');

// API Key
const weatherKey = '8c83e89754d126b0d394cbb3bef41baf';
const mapKey = 'a9LvCQ9nZ8pqbOHaPiCg0C2mZvNjQWFT';



// Functions
function changeLocation() {
  if (cityName.value && stateName.value) {
    fetchData(cityName.value, stateName.value);
  }
}

function fetchData(city, state) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${weatherKey}`)
      .then(response => response.json())
      .then(json => render(json, state));
}

function render(json, state) {
  cityLocation.textContent = json.name;
  description.textContent = json.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  temperature.textContent = `${(((json.main.temp - 273.15) * 1.8) + 32).toFixed(1) + ' °F'} (${(json.main.temp - 273.15).toFixed(1) + ' °C'})`;
  icon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
  humidity.textContent = `Relative Humidity: ${json.main.humidity}%`;
  feelsLike.textContent = `Feels Like: ${(((json.main.feels_like - 273.15) * 1.8) + 32).toFixed(0) + ' °F'} (${(json.main.feels_like - 273.15).toFixed(0) + ' °C'})`;
  wind.textContent = `From ${json.wind.deg}° at ${json.wind.speed} m/s`;

  localStorage.setItem('city', json.name);
  localStorage.setItem('state', state);
}



// Event Listeners
changeLocationBtn.addEventListener('click', changeLocation);



// Local Storage
function renderStoredLocation() {
  const savedCity = localStorage.getItem('city');
  const savedState = localStorage.getItem('state');
  fetchData(savedCity, savedState);
}

renderStoredLocation();



// Find User Location

function findUserCity() {
  if (!navigator.geolocation) {
    document.querySelector('.alert').textContent = "Geolocation is not supported by your browser.";
    return;
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    reverseGeocoding(longitude, latitude);
  }
  function error() {
    document.querySelector('.alert').textContent = "Unable to retrieve your location."
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function reverseGeocoding(longitude, latitude) {
  fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${mapKey}&location=${latitude},${longitude}`)
    .then(response => response.json())
    .then(json => {
      const city = json.results[0].locations[0].adminArea5;
      const state = json.results[0].locations[0].adminArea3;
      fetchData(city, state);
    });
}

if (!localStorage.getItem('city')) {
  findUserCity()
};