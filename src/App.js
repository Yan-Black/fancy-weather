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
import { getName, ID_API, WEATHER_API, BACKGROUND_API, setNewBackImage } from './base/constants';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [latitude, setLat] = useState(0);
  const [longtitude, setLon] = useState(0);
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const placeholder = 'C:/Users/Olga/Desktop/fancy weather/react simple example/weather-react/src/assets/images/background.jpg';

  function search (e) {
    if (e.key === 'Enter' || e.target.className === "search-but") {
      getWeatherData();
      getForecast();
      getBackImage();
    }
  }

  function getWeatherData(idCity) {
    hideError()
    fetch(`${WEATHER_API.base}weather?q=${query || idCity}&units=metric&appid=${WEATHER_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => {
        setWeather(result);
        setLon(result.coord.lon);
        setLat(result.coord.lat); 
        getBackImage();
        setQuery('');
    })
    .catch(() => {
      showError('City was not found');
    })
  }

  function getForecast(idCity) {
    fetch(`${WEATHER_API.base}forecast?q=${query || idCity}&units=metric&appid=${WEATHER_API.key}`)
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
    spinner.classList.add('load-image');
    fetch(`${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&featured=nature&query=${weatherState.innerText}&client_id=${BACKGROUND_API.key}`)
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
    fetch(`${ID_API.base}json?token=${ID_API.key}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(result => { 
        getWeatherData(result.city);
        getForecast(result.city);
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
      }; 
      img.onerror = () => {
        setNewBackImage(setSourceLoaded, placeholder, loader)
      };      
  }

  useEffect(getUserLocation, []);

   return (
    <div className="App" style={{ backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})` }} >
      <main>
        <Preloader />
        <div className="header">
          <Controls changeImg={getBackImage}/>
          <Error />
          <SearchBar fn={setQuery} query={query} search={search}/>
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <div>
            <div className="weather-section">
              <div className="weather-block">
                <div className="weather-header">
                  <div className="location">
                      <LocationBlock city={weather.name} country={getName(weather.sys.country)} />
                      {weather.timezone ? (
                        <RegionDate timeZone={weather.timezone} />
                      ) : (null)}
                  </div>
                  {weather.timezone ? (
                    <Clock timeZone={weather.timezone} />
                  ) : (null)}
                </div>
                <WeatherBlock 
                  temp={weather.main.temp}
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  desc={
                    [
                      weather.weather[0].main,
                      weather.main.feels_like,
                      weather.main.humidity,
                      weather.wind.speed
                    ]
                  }
                />
                {(typeof forecast.list !== 'undefined') ? (
                  <ForecastBlock 
                    day= {
                      [
                        new Date(forecast.list[1].dt_txt).toString().slice(0,3),
                        new Date(forecast.list[9].dt_txt).toString().slice(0,3),
                        new Date(forecast.list[17].dt_txt).toString().slice(0,3),
                        new Date(forecast.list[25].dt_txt).toString().slice(0,3),
                        new Date(forecast.list[33].dt_txt).toString().slice(0,3),
                      ]
                    }
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
