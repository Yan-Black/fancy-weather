import React, { useContext } from 'react';
import { weatherCodesRu, weatherCodesEng, weatherCodesBel } from '../../../constants/app-weather-codes';
import { weatherConditionsIcons } from '../../../constants/app-weather-icons';
import { appContext } from '../../App';
import './index.css';

const WeatherBlock = () => {
  const {
    payload: [,
      lang,,
      {
        temp,
        icon,
        cod,
        feelsLike,
        humidity,
        speed,
      },
    ],
  } = useContext(appContext);

  const description =
  lang.select === 'EN'
    ? weatherCodesEng[cod]
    : lang.select === 'RU'
      ? weatherCodesRu[cod]
      : weatherCodesBel[cod];

  return (
    <div className="weather-area">
      <div className="current-temp">
        <p className="main-temp">{`${temp.toFixed(0)}°`}</p>
        <img className="mobile-icon" src={weatherConditionsIcons[icon]} alt="icon"/>
      </div>
      <div className="current-icon">
        <img className="weather-icon" src={weatherConditionsIcons[icon]} alt="icon"/>
      </div>
      <div className="current-description">
        <ul className="description-list">
          <li className="weather-state">{description}</li>
          <li>
            <span>
              {lang.feelsLike}
            </span>
            <span  className="description-temp">
              {`${Math.floor(feelsLike)}°`}
            </span>
          </li>
          <li>
            <span>
              {lang.humidity}
            </span>
            <span className="humidity">
              {`${humidity}%`}
            </span>
          </li>
          <li>
            <span>
              {lang.wind}
            </span>
            <span className="wind">
              {speed}
            </span>
            <span>
              {lang.ms}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WeatherBlock;
