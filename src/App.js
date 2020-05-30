import React, { useState, useEffect } from 'react';
import Error from './components/Error';
import Controls from './components/Controls';
import RegionDate from './components/Date';
import Clock from './components/Clock';
import SearchBar from './components/Search';
import LocationBlock from './components/Location';
import WeatherBlock from './components/Weather';
import ForecastBlock from './components/Forecast';
import MapBlock from './components/Map';
import Preloader from './components/Preloader';
import { getName, ID_API, WEATHER_API, BACKGROUND_API, TRANSLATE_API, setNewBackImage, defineCurrentUnits, setActiveUnitsButtonFromStorage, setActiveLangFromStorage } from './base/constants';

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
  // const [isLoaded, setLoaded] = useState(false);
  const placeholder = 'C:/Users/Olga/Desktop/fancy weather/react simple example/weather-react/src/assets/images/background.jpg';

  function search (e) {
    if (e.key === 'Enter' || e.target.className === "search-but") {
      const fButton = document.querySelector('.change-f');
      getWeatherData(query, defineCurrentUnits(fButton));
      getForecast(query, defineCurrentUnits(fButton));
      geoLocation(query);
    }
  }

  function getWeatherData(idCity, units) {
    hideError()
    fetch(`${WEATHER_API.base}weather?q=${query || idCity}&units=${units}&appid=${WEATHER_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        setWeather(result);
        setLon(result.coord.lon);
        setLat(result.coord.lat);
        getBackImage();
        setQuery('');
        translateApiData(result.name, setCityName); 
        translateApiData(result.weather[0].description, setWeatherDesc); 
    })
    .catch(() => {
      showError('City was not found');
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
}

  function getForecast(idCity, units) {
    fetch(`${WEATHER_API.base}forecast?q=${query || idCity}&units=${units}&appid=${WEATHER_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        setForecast(result);
    })
    .catch()
  }

  function getBackImage() {
    hideError()
    const spinner = document.querySelector('.rotate-icon');
    const loader = document.querySelector('.preloader');
    const weatherState = document.querySelector('.weather-state');
    const timeString = document.querySelector('.region-date').innerText;
    const dayTime = parseInt(timeString.slice(0,2));
    spinner.classList.add('load-image');
    fetch(`${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&featured=nature&query=${weatherState.innerText},${dayTime}&client_id=${BACKGROUND_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => { 
        LazyBackgroundLoader(result.urls.full, spinner, loader);
      })
      .catch(() => {
        showError('image request limit exceeded');
        spinner.classList.remove('load-image');
        LazyBackgroundLoader(placeholder, spinner, loader);
      });
  }

  function getUserLocation() {
    const fButton = document.querySelector('.change-f');
    fetch(`${ID_API.base}json?token=${ID_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => { 
        setActiveUnitsButtonFromStorage();
        setActiveLangFromStorage();
        getWeatherData(result.city, defineCurrentUnits(fButton));
        getForecast(result.city, defineCurrentUnits(fButton));
        geoLocation(result.city);
      })
      .catch()
  }

  function showError(err) {
    const errorBlock = document.querySelector('.error-block');
    const errorMessage = document.querySelector('.error');
    errorMessage.innerText = err;
    errorBlock.classList.remove('error-hidden');
  }
  
  function hideError() {
    const errorBlock = document.querySelector('.error-block');
    const errorMessage = document.querySelector('.error');
    if (!errorBlock.classList.contains('error-hidden')) {
      errorBlock.classList.add('error-hidden');
    }
    errorMessage.innerText = '';
  }

  function LazyBackgroundLoader(src, spinner, loader) {  
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setNewBackImage(setSourceLoaded, src, loader)
        spinner.classList.remove('load-image');
        const langSelector = document.querySelectorAll('.lang-selector');
        const langMenu = document.querySelector('.lang-list');
        langSelector.forEach(selector => {
          if (selector.innerText === localStorage.getItem('lang').toUpperCase()) {
            selector.click();
          } 
        });
        langMenu.classList.add('hidden-list');
        // setLoaded(true);
      }; 
      // useEffect(img.onload,[src])
      img.onerror = () => {
        setNewBackImage(setSourceLoaded, placeholder, loader)
      };      
  }
function geoLocation(idCity) {
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query || idCity}&key=0558628d9eba4dc98e9177e831c36e9d&pretty=1&no_annotations=1`)
  .then(res => res.json())
  .then(res => {
    translateApiData(res.results[0].components.country, setCountryName); 
  })
}


  useEffect(getUserLocation, []);

   return (
    <div className="App" style={{ backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})` }}>
      <Preloader />
      <main>
        <div className="header">
          <Controls changeImg={getBackImage}/>
          <Error />
          <SearchBar fn={setQuery} query={query} search={search}/>
        </div>
        {weather.main ? (
          <div>
            <div className="weather-section">
              <div className="weather-block">
                <div className="weather-header">
                  <div className="location">
                      <LocationBlock city={cityName} country={countryName} />
                      {weather.timezone ? (
                        <RegionDate timeZone={weather.timezone} />
                      ) : (null)}
                  </div>
                  {weather.timezone ? (
                    <Clock timeZone={weather.timezone} />
                  ) : (null)}
                </div>
                {(weather.main.temp) ? (
                  <WeatherBlock 
                  cod={weather.weather[0].id}
                  temp={weather.main.temp}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  desc={
                    [
                      weatherDescription,
                      weather.main.feels_like,
                      weather.main.humidity,
                      weather.wind.speed
                    ]
                  }
                />
                ) : (null)}
                {(typeof forecast.list !== 'undefined') ? (
                  <ForecastBlock 
                    temp={
                      [
                        forecast.list[1].main.temp,
                        forecast.list[9].main.temp,
                        forecast.list[17].main.temp,
                        forecast.list[25].main.temp,
                        forecast.list[33].main.temp
                      ]
                    }
                    src={
                      [
                        `http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png`,
                        `http://openweathermap.org/img/wn/${forecast.list[9].weather[0].icon}@2x.png`,
                        `http://openweathermap.org/img/wn/${forecast.list[17].weather[0].icon}@2x.png`,
                        `http://openweathermap.org/img/wn/${forecast.list[25].weather[0].icon}@2x.png`,
                        `http://openweathermap.org/img/wn/${forecast.list[33].weather[0].icon}@2x.png`
                      ]
                    }
                  />
                ) : (null)}
              </div>
              {(longtitude && latitude && weather.name) ? (
                <MapBlock lng={longtitude} lat={latitude} setLon={setLon} setLat={setLat} name={weather.name}/>
              ) : null}
            </div>
          </div>
        ) : (null)}
      </main>
    </div>
  );
}

export default App;
