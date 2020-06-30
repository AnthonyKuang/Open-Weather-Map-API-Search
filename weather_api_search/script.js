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
const apiKey = '8c83e89754d126b0d394cbb3bef41baf';



// Functions
function changeLocation() {
  if (cityName.value && stateName.value) {
    fetchData(cityName.value, stateName.value);
  }
}

function fetchData(city, state) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${apiKey}`)
      .then(response => response.json())
      .then(json => render(json));
}

function render(json) {
  cityLocation.textContent = `${json.name}, ${stateName.value}`;
  description.textContent = json.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  temperature.textContent = `${(((json.main.temp - 273.15) * 1.8) + 32).toFixed(1) + ' F'} (${(json.main.temp - 273.15).toFixed(1) + ' C'})`;
  icon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
  humidity.textContent = `Relative Humidity: ${json.main.humidity}%`;
  feelsLike.textContent = `Feels Like: ${(((json.main.feels_like - 273.15) * 1.8) + 32).toFixed(0) + ' F'} (${(json.main.feels_like - 273.15).toFixed(0) + ' C'})`;
  wind.textContent = `From ${json.wind.deg}° at ${json.wind.speed} m/s`;
}



// Event Listeners
changeLocationBtn.addEventListener('click', changeLocation);



// Run Code by default
fetchData('San Ramon', 'CA');