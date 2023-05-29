function search() {
  const searchbar = document.querySelector('#searchbar');
  const search_btn = document.querySelector('#search_btn');
  search_btn.addEventListener('click', () => {
    getWeather(searchbar.value);
  });
}

async function getWeather(value) {
  const response = await fetch(
    'http://api.weatherapi.com/v1/forecast.json?key=d2af2ae176774e7b919182628232805&q=' +
      value,
    { mode: 'cors' }
  );
  const weather_data = await response.json();
  console.log(weather_data);

  const city = document.querySelector('.city');
  city.innerHTML = value;

  const temp = document.querySelector('.temp');
  temp.innerHTML = weather_data.current.temp_c + '°C';

  const weather = document.querySelector('.weather');
  weather.innerHTML = weather_data.current.condition.text;
}

search();
