import { daysBel, daysEng, daysRu } from './translateConstants';
import { TRANSLATE_API } from './apiConstants';
import { phrase, synth } from '../components/Search';

export const setNewBackImage = (fn, src, preloader) => {
  fn(src);
  if(preloader) {
    setTimeout(() => {
      preloader.classList.add('preloader-fade-out');
    }, 800); 
    setTimeout(() => {
      preloader.remove();
    }, 1300); 
  }
} 

export const currentDayState = (val) => {
  let state;
  switch (val) {
    case val >= 7 && val <= 11:
      state = 'morning';
      break;
    case val >= 12 && val <= 17:
      state = 'day';
      break;
    case val >= 18 && val <= 23:
      state = 'evening';
      break;
    case val >= 24 && val <= 6:
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
  const descriptionTemp = document.querySelector('.description-temp');
  const forecastTemp = document.querySelectorAll('.temp-val');

  function convertToImperial(val) {
    let temp = val.slice(0, val.length - 1);
      temp = Math.round(temp * 9 / 5 + 32) + '°';
    return temp;
  }

  function convertToMetric(val) {
    let temp = val.slice(0, val.length - 1);
      temp = Math.round((temp - 32) / 1.8) + '°';
    return temp;
  }

  if (elem.classList.contains('active-but') && elem.innerText ==='F°') {
    forecastTemp.forEach(t => {
      t.innerText = convertToImperial(t.innerText);
    })
    mainTemp.innerText = convertToImperial(mainTemp.innerText);
    descriptionTemp.innerText = convertToImperial(descriptionTemp.innerText);
  }

  else if (!elem.classList.contains('active-but') && elem.innerText ==='F°') {
    forecastTemp.forEach(t => {
      t.innerText = convertToMetric(t.innerText);
    })
    mainTemp.innerText = convertToMetric(mainTemp.innerText);
    descriptionTemp.innerText = convertToMetric(descriptionTemp.innerText);
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

export const changeAppLang = (dict, codes, days, daysShort, months, lang) => {
  const elemsToTranslate = document.querySelectorAll('[data-i18n]');
  const daysToTranslate = document.querySelectorAll('[data-forecast]');
  const city = document.querySelector('.city');
  const country = document.querySelector('.country');
  daysToTranslate.forEach((_, i) => {
    daysToTranslate[i].innerText = days[new Date().getDay() + i];
  })
  elemsToTranslate.forEach((elem) => {
      elem.innerText = dict[elem.getAttribute('data-i18n')] || codes[elem.getAttribute('data-i18n')];
      if (elem.getAttribute('data-i18n') === 'day') {
        elem.innerText = `${daysShort[new Date().getDay()]} `;
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
  .catch(() => {
    showError('invalid translate request');
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

export const showError = err => {
  const errorBlock = document.querySelector('.error-block');
  const errorMessage = document.querySelector('.error');
  errorMessage.innerText = err;
  errorBlock.classList.remove('error-hidden');
}

export const hideError = () => {
  const errorBlock = document.querySelector('.error-block');
  const errorMessage = document.querySelector('.error');
  if (!errorBlock.classList.contains('error-hidden')) {
    errorBlock.classList.add('error-hidden');
  }
  errorMessage.innerText = '';
}

export const handleLocationRequestError = (fn) => {
  switch(localStorage.getItem('lang')) {
    case 'be':
      fn('Горад не найдзены');
      break;
    case 'ru':
      fn('Город не найден');
      break;
    case 'en':
      fn('City was not found');
      break;
    default:
      fn('City was not found');
      break;
  }
}

export const handleImageRequestError = (fn) => {
  switch(localStorage.getItem('lang')) {
    case 'be':
      showError('Перавышаны ліміт запытаў малюнка');
      break;
    case 'ru':
      showError('Превышен лимит запросов изображения');
      break;
    case 'en':
      showError('image request limit exceeded');
      break;
    default:
      showError('image request limit exceeded');
      break;
  }
}

export const toggleSpeechRecorder = (rec) => {
  const mic = document.querySelector('.mic-icon');
  mic.classList.toggle('mic-active');
  if (mic.classList.contains('mic-active')) {
      rec.start();
  } else {
      rec.stop();
  }
}


export const readForecast = (volume) => {
  const temp = document.querySelector('.main-temp').innerText;
  const description = document.querySelector('.weather-state').innerText;
  const feelsLike = document.querySelector('.description-temp').innerText;
  const humidity = document.querySelector('.humidity').innerText;
  const wind = document.querySelector('.wind').innerText;
  const ruForecast = `Сегодня ${temp}, ${description}, ощущается как ${feelsLike}, влажность ${humidity}, скорость ветра ${wind} метров в секунду`;
  const enForecast = `Today is ${temp}, ${description}, feels like ${feelsLike}, humidity is ${humidity}, wind speed is  ${wind} meters in a second`;
  const playIcon = document.querySelector('.play-icon');
  const stopIcon = document.querySelector('.stop-icon');

  if (phrase.lang === 'en-EN') {
    phrase.text = enForecast;
    if (volume === 'quieter' || volume === 'тише') {
      synth.volume = 0.5;
    }
    if (volume === 'louder' || volume === 'громче') {
      synth.volume = 1;
    }
    synth.speak(phrase);
    phrase.onend = () => {
      playIcon.classList.add('active-icon')
      stopIcon.classList.remove('active-icon');
    } 
  }
  if (phrase.lang === 'ru-RU') {
    phrase.text = ruForecast;
    if (volume === 'quieter' || volume === 'тише') {
      phrase.volume = 0.5;
    }
    if (volume === 'louder' || volume === 'громче') {
      phrase.volume = 1;
    }
    synth.speak(phrase);
    phrase.onend = () => {
      playIcon.classList.add('active-icon')
      stopIcon.classList.remove('active-icon');
    } 
  }
  if (playIcon.classList.contains('active-icon')) {
      playIcon.classList.remove('active-icon')
      stopIcon.classList.add('active-icon');
  } else {
    synth.cancel();
    playIcon.classList.add('active-icon')
    stopIcon.classList.remove('active-icon');
  }
}