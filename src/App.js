import React, { useState, useEffect } from 'react';
import Error from './components/Error';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import Preloader from './components/Preloader';
import placeholder from './assets/images/background.jpg';
import { ID_API, WEATHER_API, TRANSLATE_API, GEOLOCATION_API } from './base/apiConstants';
import { BACKGROUND_API } from './base/apiConstants';
import { setNewBackImage, defineCurrentUnits } from './base/functionalConstants';
import { setActiveUnitsButtonFromStorage, setActiveLangFromStorage, currentDayState, currentWeatherPeriod } from './base/functionalConstants';
import { showError, hideError, handleLocationRequestError, handleImageRequestError } from './base/functionalConstants';
import Main from './components/Main';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [latitude, setLat] = useState(0);
  const [longtitude, setLon] = useState(0);
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [weatherDescription, setWeatherDesc] = useState('');
  const [pictureDescription, setPictureDesc] = useState('');
  const [pictureCity, setPictureCity] = useState('');

  function search (e) {
    if (e.key === 'Enter' || e.target.className === "search-but") {
      geoLocation(query);
    }
  }

  function getUserLocation() {
    fetch(`${ID_API.base}json?token=${ID_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => { 
        setActiveUnitsButtonFromStorage();
        setActiveLangFromStorage();
        geoLocation(result.city);
      })
      .catch();
  }

  function geoLocation(idCity) {
    const fButton = document.querySelector('.change-f');
    fetch(`${GEOLOCATION_API.base}json?q=${query || idCity}&key=${GEOLOCATION_API.key}&pretty=1&no_annotations=1`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(res => {
      getWeatherData(res.results[0].geometry.lat, res.results[0].geometry.lng, defineCurrentUnits(fButton));
      getForecast(res.results[0].geometry.lat, res.results[0].geometry.lng, defineCurrentUnits(fButton));
      setLon(res.results[0].geometry.lng);
      setLat(res.results[0].geometry.lat);
      translateApiData(res.results[0].components.country, setCountryName); 
    })
    .catch(() => {
      handleLocationRequestError(showError);
    })
  }

  function getWeatherData(lat, lon, units) {
    hideError()
    fetch(`${WEATHER_API.base}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        setWeather(result);
        getBackImage(result.name, result.weather[0].main);
        setQuery('');
        setPictureDesc(result.weather[0].main);
        setPictureCity(result.name);
        translateApiData(result.name, setCityName); 
        translateApiData(result.weather[0].description, setWeatherDesc); 
    })
    .catch(() => {
      handleLocationRequestError(showError);
    })
  }

  function translateApiData(data, fn) {
  const lang = localStorage.getItem('lang') || 'en';
  fetch(`${TRANSLATE_API.base}tr.json/translate?key=${TRANSLATE_API.key}&text=${data}&lang=${lang}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(res => {
      const text = res.text ;
      const translate = text[0];
      fn(translate);
    })
    .catch(() => {
      showError('invalid translate request');
    });
}

  function getForecast(lat, lon, units) {
    fetch(`${WEATHER_API.base}forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        setForecast(result);
    })
    .catch()
  }

  function getBackImage(city, desc) {
    hideError()
    const spinner = document.querySelector('.rotate-icon');
    const loader = document.querySelector('.preloader');
    spinner.classList.add('load-image'); 
    console.log(`запрос бекграунда: ${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&featured=nature&query=${pictureDescription || desc},${pictureCity || city},${currentWeatherPeriod(new Date().getMonth())},${currentDayState(new Date().getHours())}&client_id=...`);
    fetch(`${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&featured=nature&query=${pictureDescription || desc},${pictureCity || city},${currentWeatherPeriod(new Date().getMonth())},${currentDayState(new Date().getHours())}&client_id=${BACKGROUND_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        LazyBackgroundLoader(result.urls.full, spinner, loader);
      })
      .catch(() => {
        handleImageRequestError(showError)
        spinner.classList.remove('load-image');
        LazyBackgroundLoader(placeholder, spinner, loader);
      });
  }

  function LazyBackgroundLoader(src, spinner, loader) {  
      const img = new Image();
      const langSelector = document.querySelectorAll('.lang-selector');
      const langMenu = document.querySelector('.lang-list');
      const appLang = document.querySelector('.app-lang');
      img.src = src;
      img.onload = () => {
        setNewBackImage(setSourceLoaded, src, loader)
        spinner.classList.remove('load-image');
        langSelector.forEach(selector => {
          if (selector.innerText === appLang.innerText) {
            selector.click();
          }
          if (!localStorage.getItem('guide')) {
            alert(`Привет! Небольшой гайд по голосовому управлению ) 
            Для получения прогноза погоды нажми кнопку "play".\n
            Что бы получить прогноз голосовой командой нажми на иконку микрофона, и в зависимости от выбранного языка, скажи <Прогноз>, либо <forecast>.\n 
            Озвучку можно остановить нажав на кнопку стоп.\n Чтобы следующее сообщение было тише, в зависимости от выбранного языка скажи <тише>, либо <quieter>\n
            Для увеличения громкости <громче> и <louder> соответственно.\n
            Ключ для отображения этого сообщения хранится в localStorage и до следующей очистки кеша оно больше не появится\n
            Удачи!`);
            localStorage.setItem('guide', true);
          }
        });
        langMenu.classList.add('hidden-list');
      }; 
      img.onerror = () => {
        setNewBackImage(setSourceLoaded, placeholder, loader);
        langSelector.forEach(selector => {
          if (selector.innerText === appLang.innerText) {
            selector.click();
          }  
        });
        langMenu.classList.add('hidden-list');
      };      
  }

  useEffect(getUserLocation, []);

   return (
    <div className="App" style={{ backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})` }}>
      <Preloader />
      <main>
        <div className="header">
          <Controls changeImg={getBackImage}/>
          <Error />
          <SearchBar fn={setQuery} query={query} search={search} lang={localStorage.getItem('lang')}/>
        </div>
        {weather.main && cityName && countryName && forecast.list && longtitude && latitude ? (
          <Main weather={weather} 
                city={cityName} 
                country={countryName} 
                weatherDescription={weatherDescription} 
                forecast={forecast} lng={longtitude} 
                lat={latitude} 
                setLon={setLon} 
                setLat={setLat} 
              />
        ) : (null)}
      </main>
    </div>
  );
}

export default App;
