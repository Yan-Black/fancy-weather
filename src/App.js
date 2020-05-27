import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import LocationBlock from './components/Location';
import WeatherBlock from './components/Weather';
import ForecastBlock from './components/Forecast';
import MapBlock from './components/Map';

const { getName } = require('country-list');
const defaultCity = 'Minsk';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ID_API ={
  key: '465144289736aa',
  base: 'https://ipinfo.io/'
}
const WEATHER_API = {
  key: 'ca2af16f2e06c1e0b367014ae6b14e53',
  base: 'https://api.openweathermap.org/data/2.5/'
};
const BACKGROUND_API = {
  key: 'a96vjeJorduF_JUfRtLii9qY2b8-tX3cZG0T_Si10W0',
  base: 'https://api.unsplash.com/photos/'
};
const dateBuilder = (d) => {
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [image, setImage] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      getWeatherData();
      getForecast();
      getBackImage();
    }
  }

  function getWeatherData(defCity) {
    fetch(`${WEATHER_API.base}weather?q=${query || defCity}&units=metric&appid=${WEATHER_API.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);  
    });
  }

  function getForecast(defCity) {
    fetch(`${WEATHER_API.base}forecast?q=${query || defCity}&units=metric&appid=${WEATHER_API.key}`)
      .then(res => res.json())
      .then(result => {
        setForecast(result);
    });
  }

  function getBackImage() {
    getWeatherData(defaultCity)
    fetch(`${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&query=nature&client_id=${BACKGROUND_API.key}`)
      .then(res => res.json())
      .then(result => { 
        setImage(result.urls.full)
      })
  }

  function getId() {
    fetch(`${ID_API.base}json?token=${ID_API.key}`)
      .then(res => res.json())
      .then(result => { 
        console.log(result);  
      })
  }

  useEffect(getForecast.bind(null, defaultCity), []);
  useEffect(getWeatherData.bind(null, defaultCity), []);
  useEffect(getBackImage, []);
  useEffect(getId, []);
  
   return (
    <div className="App" style={{ backgroundImage: `url(${image})` }}>
      <main>
        <div className="header">
          <Controls />
          <SearchBar fn={setQuery} query={query} search={search}/>
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <div>
            <div className="weather-section">
              <div className="weather-block">
                <div className="weather-header">
                  <div className="location">
                      <LocationBlock city={weather.name} country={weather.sys.country} />
                    <div className="date-block">
                      <h2 className="date">{dateBuilder(new Date())}</h2>
                    </div>
                  </div>
                  <div className="clock">
                    {/* <Clock format={'HH:mm:ss'} ticking={true} timezone={`${weather.sys.country}/${weather.name}`} /> */}
                  </div>
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
                ) : ('')}
              </div>
              <MapBlock />
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
