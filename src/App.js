import React, { useState, useEffect, createContext } from 'react';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import Preloader from './components/Preloader';
import placeholder from './assets/images/background.jpg';
import Main from './components/Main';
import Modal from './components/ErrorModal';
import { en, ru, be } from './constants/app-langs';
import { getUserLocation } from './constants/api-requsets';

export const appContext = createContext();

const App = () => {
  const { appLang } = localStorage;
  let langToApply;

  switch (appLang) {
  case 'en':
    langToApply = en;
    break;
  case 'ru':
    langToApply = ru;
    break;
  case 'be':
    langToApply = be;
    break;
  default: langToApply = en;
  }

  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [lang, setLang] = useState(langToApply);
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState(null);
  const [latitude, setLat] = useState(0);
  const [longtitude, setLon] = useState(0);
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [weatherDescription, setWeatherDesc] = useState('');
  const [forecastTemp, setForecastTemp] = useState([]);
  const [mainTemp, setMainTemp] = useState([]);
  const langToTranslate = lang.select.toLowerCase();

  const ctx = {
    setters: [
      setQuery,
      setLoading,
      setLang,
      setLat,
      setLon,
      setLocationName,
      setForecastTemp,
      setMainTemp,
      setWeather,
      setWeatherDesc,
      setForecast,
      setSourceLoaded,
      setInfoLoading,
      setErrorMessage,
      setOpenErrorModal,
    ],
    payload: [
      lang,
      mainTemp,
      forecastTemp,
      locationName,
      weatherDescription,
      query,
      forecast,
      weather,
      latitude,
      longtitude,
      infoLoading,
    ],
    err: [setOpenErrorModal, errorMessage],
  }

  const setters = [setLon, setLat, setMainTemp, setWeather, setForecastTemp, setForecast, setSourceLoaded];
  useEffect(() => {
    const fetchData = async () => {
      getUserLocation(
        setLoading,
        setQuery,
        setLocationName,
        setWeatherDesc,
        setErrorMessage,
        setOpenErrorModal,
        setters,
        langToTranslate,
      )
    };
    fetchData();
  }, []);

  return (
    <appContext.Provider value={ctx} >
      <div
        className="App"
        style={{
          backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})`,
        }}
      >
        {loading && <Preloader/>}
        {openErrorModal && <Modal />}
        <div className="weather-wrapper">
          <div className="header">
            <Controls />
            {forecast && <SearchBar />}
          </div>
          {forecast && <Main />}
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
