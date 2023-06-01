let show_celcius = true;

function change_temp() {
  const temp_btn = document.querySelector('#temp_switch');
  const temp_c = document.querySelector('.temp_c');
  const temp_f = document.querySelector('.temp_f');
  temp_btn.addEventListener('click', () => {
    if (show_celcius) {
      show_celcius = false;
      temp_c.style.display = 'none';
      temp_f.style.display = 'block';
    } else {
      show_celcius = true;
      temp_c.style.display = 'block';
      temp_f.style.display = 'none';
    }
    console.log(show_celcius);
  });
}

function search() {
  const searchbar = document.querySelector('#searchbar');
  const search_btn = document.querySelector('#search_btn');
  search_btn.addEventListener('click', () => {
    get_weather(searchbar.value);
  });
}

async function get_weather(value) {
  const response = await fetch(
    'http://api.weatherapi.com/v1/forecast.json?key=d2af2ae176774e7b919182628232805&q=' +
      value,
    { mode: 'cors' }
  );
  const weather_data = await response.json();
  console.log(weather_data);

  const city = document.querySelector('.city');
  city.innerHTML = value;

  const temp_c = document.querySelector('.temp_c');
  temp_c.innerHTML = weather_data.current.temp_c + '°C';

  const temp_f = document.querySelector('.temp_f');
  temp_f.innerHTML = weather_data.current.temp_f + '°F';

  const weather = document.querySelector('.weather');
  weather.innerHTML = weather_data.current.condition.text;

  get_day(weather_data.forecast.forecastday[0].hour);
}

function get_day(data) {
  console.log(data);

  console.log(data[0]);
}

search();
change_temp();
