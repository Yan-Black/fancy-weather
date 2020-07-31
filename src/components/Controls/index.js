import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {
  celsius,
  farenheit,
  convertToImperial,
  convertToMetric,
  defaultUnits,
} from '../../constants/app-constants';
import { translateApiData, getBackImage } from '../../constants/api/api-requsets';
import { en, ru, be, langSelectors } from '../../constants/app-langs';
import { weatherCodesRu, weatherCodesEng, weatherCodesBel } from '../../constants/app-weather-codes';
import { appContext } from '../App';
import './index.css';

const Controls = () => {
  const [units, setUnits] = useState(defaultUnits);
  const [isListOpen, setListOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const {
    setters: [,
      setLang,
      setErr,
      setWeatherData,
      setSourceLoaded,,,
    ],
    payload: [,
      lang,,
      weatherData,
    ],
  } = useContext(appContext);

  const openlist = () => setListOpen(!isListOpen);
  const { cod } = weatherData;

  const description =
  lang.select === 'EN'
    ? weatherCodesEng[cod]
    : lang.select === 'RU'
      ? weatherCodesRu[cod]
      : weatherCodesBel[cod];

  const selectLang = (e) => {
    const { target } = e;
    const langToApply = target.id.slice(0, 2);
	  switch (langToApply) {
    case 'en':
      localStorage.setItem('appLang', langToApply);
      translateApiData(weatherData, setWeatherData, langToApply, setErr, setLang, en);
      break;
    case 'ru':
      localStorage.setItem('appLang', langToApply);
      translateApiData(weatherData, setWeatherData, langToApply, setErr, setLang, ru);
      break;
    case 'be':
      localStorage.setItem('appLang', langToApply);
      translateApiData(weatherData, setWeatherData, langToApply, setErr, setLang, be);
		  break;
	  default: setLang(en);
	  }
  }

  const changeActiveUnits = () => {
    if (units === celsius) {
      setUnits(farenheit);
      const imperialData = { ...weatherData };
      const temps = imperialData.forecastTemps.map(convertToImperial);
      imperialData.forecastTemps = temps;
      imperialData.temp = convertToImperial(imperialData.temp);
      imperialData.feelsLike = convertToImperial(imperialData.feelsLike);
      setWeatherData(imperialData);
      localStorage.setItem('appUnits', farenheit);
    }	else {
      setUnits(celsius);
      const metricData = { ...weatherData };
      const temps = metricData.forecastTemps.map(convertToMetric);
      metricData.forecastTemps = temps;
      metricData.temp = convertToMetric(metricData.temp);
      metricData.feelsLike = convertToMetric(metricData.feelsLike);
      setWeatherData(metricData);
      localStorage.setItem('appUnits', celsius);
    }
  };

  const imageHandler = () => getBackImage(
    setImageLoading,
    setErr,
    weatherData,
    setWeatherData,
    setSourceLoaded,
    null,
    description,
  );

  return (
    <div className="controls">
      <div className="change-image" onClick={imageHandler} >
        <FontAwesomeIcon
          icon={faSyncAlt}
          className={imageLoading ? 'rotate-icon load-image' : 'rotate-icon'}
        />
      </div>
      <div className="change-lang" onClick={openlist}>
        <p className="app-lang">{lang.select}</p>
        <FontAwesomeIcon icon={faAngleDown} />
        <ul
          className={
            isListOpen
              ? 'lang-list'
              : 'hidden-list'
          }
          onClick={selectLang}
        >
          {langSelectors.map((sel) => (
            <li
              className="lang-selector"
              id={sel.id}
              key={sel.id}
            >
              {sel.lang}
            </li>
          ))}
        </ul>
      </div>
      <div className="change-units">
        <button
          className={
            units === celsius
              ? 'change-to-farenheit active-unit'
              : 'change-to-farenheit'
          }
          onClick={changeActiveUnits}>
          {'C°'}
        </button>
        <button
          className={
            units === farenheit
              ? 'change-to-celsius active-unit'
              : 'change-to-celsius'
          }
          onClick={changeActiveUnits}
        >
          {'F°'}
        </button>
      </div>
    </div>
  )
}

export default Controls;
