import React, { useState, useEffect, createContext } from 'react';
import Controls from '../Controls';
import SearchBar from '../Search';
import Preloader from '../Preloader';
import placeholder from '../../assets/images/background.jpg';
import Main from '../Main';
import Modal from '../ErrorModal';
import InfoLoader from '../InfoLoader';
import { en, ru, be } from '../../constants/app-langs';
import { getUserLocation } from '../../constants/api/api-requsets';
import { errData } from '../../constants/app-constants';
import './index.css';

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
  const [err, setErr] = useState(errData);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [lang, setLang] = useState(langToApply);
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const langToTranslate = lang.select.toLowerCase();
  const ctx = {
    setters: [
      setQuery,
      setLang,
      setErr,
      setWeatherData,
      setSourceLoaded,
      setLoading,
      setInfoLoading,
    ],
    payload: [query, lang, infoLoading, weatherData],
    err: [err, setErr],
  }

  useEffect(() => {
    const fetchData = async () => {
      getUserLocation(
        setLoading,
        setQuery,
        setErr,
        setWeatherData,
        setSourceLoaded,
        langToTranslate,
      )
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <appContext.Provider value={ctx} >
      <div
        className="App"
        style={{
          backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})`,
        }}
      >
        {infoLoading && <InfoLoader lng={lang} />}
        {loading && <Preloader/>}
        {err.open && <Modal />}
        <div className="weather-wrapper">
          <div className="header">
            {weatherData && <Controls />}
            {weatherData && <SearchBar />}
          </div>
          {weatherData && <Main />}
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
