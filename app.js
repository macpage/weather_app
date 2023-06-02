let show_celcius = true;

// Click temp button to swich all the temps to celcius or fahrenheit
// Hide and show the classes
function change_temp() {
  const temp_btn = document.querySelector('#temp_switch');
  temp_btn.addEventListener('click', () => {
    const temp_c = document.querySelectorAll('.temp_c');
    const temp_f = document.querySelectorAll('.temp_f');
    if (show_celcius) {
      show_celcius = false;
      for (let i = 0; i < temp_c.length; i++) {
        temp_c[i].style.display = 'none';
        temp_f[i].style.display = 'block';
      }
    } else {
      show_celcius = true;
      for (let i = 0; i < temp_c.length; i++) {
        temp_c[i].style.display = 'block';
        temp_f[i].style.display = 'none';
      }
    }
    console.log(show_celcius);
    console.log(temp_c.length);
  });
}

// Enter a city name and click the button to seach todays weather data
function search() {
  const searchbar = document.querySelector('#searchbar');
  const search_btn = document.querySelector('#search_btn');
  search_btn.addEventListener('click', () => {
    get_weather(searchbar.value);
  });
}

// Fetch weather data from api and show them
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

// Show data of the whole day
function get_day(data) {
  console.log(data);

  console.log(data[0]);
  data.forEach((e, index) => {
    const c = document.createElement('p');
    c.setAttribute('class', 'temp_c');
    const f = document.createElement('p');
    f.setAttribute('class', 'temp_f');
    const condition = document.createElement('p');

    c.innerHTML = index + ' ' + e.temp_c + '°C';
    f.innerHTML = index + ' ' + e.temp_f + '°F';
    condition.innerHTML = e.condition.text;
    console.log(index);
    document.querySelector('#weather_fullday').append(c, f, condition);
  });
}

search();
change_temp();
