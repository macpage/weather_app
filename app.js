let show_celcius = true;

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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
        temp_btn.innerHTML = '°F';
      }
    } else {
      show_celcius = true;
      for (let i = 0; i < temp_c.length; i++) {
        temp_c[i].style.display = 'block';
        temp_f[i].style.display = 'none';
        temp_btn.innerHTML = '°C';
      }
    }
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
      value +
      '&days=7',
    { mode: 'cors' }
  );
  const weather_data = await response.json();
  console.log(weather_data);

  const day = document.querySelectorAll('#day_name');

  const d = new Date(weather_data.forecast.forecastday[0].date);

  day.forEach((e) => {
    e.innerHTML = days[d.getDay()] + ' (Today)';
  });
  console.log('day ' + days[d.getDay()]);

  const date = document
    .querySelector('#current_weather')
    .querySelector('.date');
  date.innerHTML = weather_data.forecast.forecastday[0].date;

  const city = document.querySelector('.city');
  city.innerHTML = value;

  const temp_c = document.querySelector('.temp_c');
  temp_c.innerHTML = weather_data.current.temp_c + '°C';

  const temp_f = document.querySelector('.temp_f');
  temp_f.innerHTML = weather_data.current.temp_f + '°F';

  const weather = document.querySelector('.weather');
  weather.innerHTML = weather_data.current.condition.text;

  get_day(weather_data.forecast.forecastday[0].hour, days[d.getDay()]);
  get_week(weather_data);
  set_background(weather_data);
  set_icon(
    weather_data.current.condition.icon,
    document.querySelector('.icon')
  );
}

// Show data of the whole day
function get_day(data, day) {
  document.querySelector('#weather_fullday').innerHTML = '';
  const day_name = document.createElement('p');
  day_name.setAttribute('id', 'day_name');
  document.querySelector('#weather_fullday').append(day_name);
  day_name.innerHTML = day;

  // Set temps and weather condition
  let clock = 0;
  let time = 'AM';
  data.forEach((e, index) => {
    const clock_time = document.createElement('p');
    const c = document.createElement('p');
    c.setAttribute('class', 'temp_c');
    const f = document.createElement('p');
    f.setAttribute('class', 'temp_f');
    const condition = document.createElement('p');

    clock_time.innerHTML = ' [' + clock + ' ' + time + '] ';
    c.innerHTML = e.temp_c + '°C';
    f.innerHTML = e.temp_f + '°F';
    condition.innerHTML = e.condition.text;
    clock++;
    if (clock == 12) {
      time = 'PM';
    }
    if (clock == 13) {
      clock = 1;
    }
    document
      .querySelector('#weather_fullday')
      .append(clock_time, c, f, condition);
  });

  // Set the right temp if changing days
  const temp_c = document.querySelectorAll('.temp_c');
  const temp_f = document.querySelectorAll('.temp_f');
  if (!show_celcius) {
    for (let i = 0; i < temp_c.length; i++) {
      temp_c[i].style.display = 'none';
      temp_f[i].style.display = 'block';
    }
  } else {
    for (let i = 0; i < temp_c.length; i++) {
      temp_c[i].style.display = 'block';
      temp_f[i].style.display = 'none';
    }
  }
}

// show weather for whole week
// Click day to show more data
function get_week(data) {
  const week_days = document
    .querySelector('#weather_fullweek')
    .querySelectorAll('div');

  console.log(week_days[0]);

  week_days.forEach((e, index) => {
    // Set weather week day to current weak days starting from todays date
    const d = new Date(data.forecast.forecastday[index].date);
    e.querySelector('p').innerHTML = days[d.getDay()];

    if (index == 0) {
      e.querySelector('p').innerHTML = days[d.getDay()] + ' (Today)';
    }

    // Set date
    const date = e.querySelector('.date');
    date.innerHTML = data.forecast.forecastday[index].date;

    // Set weather icon
    set_icon(
      data.forecast.forecastday[index].day.condition.icon,
      e.querySelector('img')
    );
    // Set temps
    e.querySelector('.temp_c').innerHTML =
      data.forecast.forecastday[index].day.avgtemp_c + '°C';
    e.querySelector('.temp_f').innerHTML =
      data.forecast.forecastday[index].day.avgtemp_f + '°F';

    // Weather information
    e.querySelector('.weather').innerHTML =
      data.forecast.forecastday[index].day.condition.text;
    // Click day to show the current day data in the full day section
    e.addEventListener('click', () => {
      const day = document
        .querySelector('#weather_fullday')
        .querySelector('#day_name');
      day.innerHTML = e.querySelector('p').innerHTML;
      get_day(data.forecast.forecastday[index].hour, days[d.getDay()]);
    });
  });
}

// Set background color depending on time and weather condition
function set_background(data) {
  console.log(data.forecast.forecastday[0].astro);
  const is_day = data.current.is_day;
  const background = document.querySelector('body');
  if (is_day == 1) {
    console.log('day');
    background.style.backgroundColor = '#00d9ff';
  } else {
    console.log('night');
    background.style.backgroundColor = '#1a264f';
  }
}

// Set icon
function set_icon(data, pic) {
  let icon = pic;

  const splitted = data.split('64x64')[1];
  icon.src = 'pics/weather' + splitted;
  return 'pics/weather' + splitted;
}

search();
change_temp();
