export const monthsEng = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
export const daysEng = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];
export const monthsRu = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
export const daysRu = [
  'Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт',
  'Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт',
];
export const monthsBel = [
  'Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Май', 'Червень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань',
  'Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Май', 'Червень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань'
];
export const daysBel = [
  'Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб',
  'Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб',
];
export const ID_API ={
  key: '465144289736aa',
  base: 'https://ipinfo.io/'
}
export const WEATHER_API = {
  key: 'ca2af16f2e06c1e0b367014ae6b14e53',
  base: 'https://api.openweathermap.org/data/2.5/'
}
export const BACKGROUND_API = {
  key: 'a96vjeJorduF_JUfRtLii9qY2b8-tX3cZG0T_Si10W0',
  base: 'https://api.unsplash.com/photos/'
}
export const TRANSLATE_API = {
  key: 'trnsl.1.1.20200506T082702Z.aac0a5a6e2461b41.433078d322a3ca6678f569df72150ce9a6f96114',
  base: 'https://translate.yandex.net/api/v1.5/'
}

export const setNewBackImage = (fn, src, loader) => {
  fn(src);
  if(loader) {
    setTimeout(() => {
      loader.classList.add('preloader-fade-out');
    }, 800); 
    setTimeout(() => {
      loader.remove();
    }, 1300); 
  }
} 

export const currentDayState = (val) => {
  let state;
  switch (val) {
    case val >= 6 && val <= 12:
      state = 'morning';
      break;
    case val > 12 && val <= 18:
      state = 'day';
      break;
    case val > 18 <= 24:
      state = 'evening';
      break;
    case val >= 0 && val < 6:
      state = 'night';
      break;
    default:
      state = 'day';
  }
  return state;
}

export const currentWeatherPeriod = (val) => {
  let period;
  switch (val) {
    case val >= 12 && val <= 2:
      period = 'winter';
      break;
    case val >= 3 && val <= 5:
      period = 'spring';
      break;
    case val >= 6 && val <= 8:
      period = 'summer';
      break;
    case val >= 9 && val <= 11:
      period = 'autumn';
      break;
    default:
      period = 'summer';
  }
  return period;
}

export const changeUnits = (elem) => {

  const mainTemp = document.querySelector('.main-temp');
  const forecastTemp = document.querySelectorAll('.temp-val');

  function convertToImperial(val) {
    let temp = val.slice(0, val.length - 1);
      temp = Math.round(temp * 9 / 5 + 32) + '°';
    return temp;
  }

  function covertToMetric(val) {
    let temp = val.slice(0, val.length - 1);
      temp = Math.round((temp - 32) / 1.8) + '°';
    return temp;
  }

  if (elem.classList.contains('active-but') && elem.innerText ==='F°') {
    forecastTemp.forEach(t => {
      t.innerText = convertToImperial(t.innerText);
    })
    mainTemp.innerText = convertToImperial(mainTemp.innerText);
  }

  else if (!elem.classList.contains('active-but') && elem.innerText ==='F°') {
    forecastTemp.forEach(t => {
      t.innerText = covertToMetric(t.innerText);
    })
    mainTemp.innerText = covertToMetric(mainTemp.innerText);
  }
}

export const defineCurrentUnits = (elem) => {
  let units;
  if (elem.classList.contains('active-but')) {
    units = 'imperial';
  } else {
    units = 'metric';
  }
  return units;
}

export const setActiveUnitsButtonFromStorage = () => {
  const fButton = document.querySelector('.change-f');
  const cButton = document.querySelector('.change-c');
  if (!localStorage.getItem('units')) {
    return
  }
  if (localStorage.getItem('units') === 'metric') {
    cButton.classList.add('active-but');
    fButton.classList.remove('active-but');
  } else {
    fButton.classList.add('active-but');
    cButton.classList.remove('active-but');
  }
}

export const setActiveLangFromStorage = () => {
  const appLang = document.querySelector('.app-lang');
  const lang = localStorage.getItem('lang');
  switch(lang) {
    case 'ru':
      appLang.innerText = 'RU';
      break;
    case 'en':
      appLang.innerText = 'EN';
      break;
    case 'be':
      appLang.innerText = 'BE';
      break;
    default:
      appLang.innerText = 'EN';
      break;
  }
}

export const translationsToEng = {
  feelsLike: 'feels like: ',
  humidity: 'humidity: ',
  wind: 'wind: ',
  search: 'search',
  ms: 'm/s',
  latitude: 'Latitude:',
  longtitude: 'Longtitude:'
}

export const translationsToRu = {
  feelsLike: 'ощущается как: ',
  humidity: 'влажность: ',
  wind: 'ветер: ',
  search: 'поиск',
  ms: 'м/с',
  latitude: 'Долгота:',
  longtitude: 'Широта:'
}

export const translationsToBel = {
  feelsLike: 'адчуваецца як: ',
  humidity: 'вiльготнасць: ',
  wind: 'вецер: ',
  search: 'пошук',
  ms: 'м/с',
  latitude: 'Даўгата:',
  longtitude: 'Шырата:'
}

export const changeAppLang = (dict, codes, days, months, lang) => {
  const elemsToTranslate = document.querySelectorAll('[data-i18n]');
  const daysToTranslate = document.querySelectorAll('[data-forecast]');
  const city = document.querySelector('.city');
  const country = document.querySelector('.country');
  daysToTranslate.forEach((elem, i) => {
    daysToTranslate[i].innerText = days[new Date().getDay() + i];
  })
  elemsToTranslate.forEach((elem) => {
      elem.innerText = dict[elem.getAttribute('data-i18n')] || codes[elem.getAttribute('data-i18n')];
      if (elem.getAttribute('data-i18n') === 'day') {
        elem.innerText = `${days[new Date().getDay()]} `;
      }
      if (elem.getAttribute('data-i18n') === 'month') {
        elem.innerText = `${months[new Date().getMonth()]} `;
      }
  })
  translateLocation(city, lang);
  translateLocation(country, lang);
}

function translateLocation(elem, lang) {
  fetch(`${TRANSLATE_API.base}tr.json/translate?key=${TRANSLATE_API.key}&text=${elem.innerText}&lang=${lang.toLowerCase()}`)
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(res => {
    const text = res.text ;
    const translate = text.join('');
    elem.innerText = translate;
  })
}

export const chooseDaysMonthArray = () => {
const lang = localStorage.getItem('lang');
let daysArr

  switch(lang) {
      case 'ru':
          daysArr = daysRu;
          break;
      case 'en':
          daysArr = daysEng;
          break;
      case 'be':
          daysArr = daysBel;
          break;
      default:
          daysArr = daysEng;
          break;
  }
  return daysArr;
}



