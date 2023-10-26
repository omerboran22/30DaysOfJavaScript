const API_KEY = '35a26e6d0b6e0f773ce7241121f8720b';
const apiUrl = new URL(`https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`);

const cardHeader = document.querySelector('.weather .card-header');
const cardBody = document.querySelector('.weather .card-body');
const cardFooter = document.querySelector('.weather .card-footer');

async function getWeather(reqFrom) {
  try {
    const form = new FormData(reqFrom);
    const city = form.get('city');
    apiUrl.searchParams.get('q') ? apiUrl.searchParams.set('q', city) : apiUrl.searchParams.append('q', city);

    const response = await fetch(`${apiUrl.href}`);
    var data = await response.json();
    Weather(data);
  } catch (error) {
    console.log(error);
  }
}

const imgEl = document.createElement('img');
const tempEl = document.createElement('div');

const Weather = (data) => {
  tempEl.className = 'temp';
  const { temp, temp_min, temp_max, feels_like } = data.main;
  const { main, description } = data.weather[0];

  cardHeader.innerHTML = `
  <span>Şehir : ${data.name}, ${data.sys.country}</span>
  <span>Tarih: ${dateManage(new Date())} </span>
  `;
  tempEl.innerHTML = `${temp}&deg;C`;
  imgEl.src = imgManage(main);
  imgEl.alt = description;
  cardBody.append(tempEl);
  cardBody.append(imgEl);

  cardFooter.innerHTML = `
  <span>En Düşük : ${temp_min}&deg;C</span>
  <span>En Yüksek: ${temp_max}&deg;C </span>
  `;
};

function imgManage(name) {
  const weatherMain = {
    Clear: './img/clear.png',
    Clouds: './img/clouds.png',
    Rain: './img/rain.png',
    Mist: './img/mist.png',
    Snow: './img/snow.png',
    Thunderstorm: './img/thunder.png',
  };

  return weatherMain[name] || '';
}

function dateManage(dateArg) {
  let days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  let months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
