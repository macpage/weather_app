let show_celcius = true;

let temp_c;
let temp_f;

let show_temp;

function change_temp() {
  const temp_btn = document.querySelector('#temp_switch');
  temp_btn.addEventListener('click', () => {
    if (show_celcius) {
      temp_c = false;
      temp_btn.innerHTML = 'F';
    } else {
      temp_c = true;
      temp_btn.innerHTML = '°C';
    }
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

  temp_c = weather_data.current.temp_c;
  temp_f = weather_data.current.temp_f;

  if (show_celcius) {
    show_temp = temp_c + '°C';
  } else {
    show_temp = temp_f + '°F';
  }

  const city = document.querySelector('.city');
  city.innerHTML = value;

  const temp = document.querySelector('.temp');
  temp.innerHTML = show_temp;

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
