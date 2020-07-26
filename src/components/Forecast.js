import React from 'react';
import { weatherConditionsIcons } from '../constants/weatherIcons';
import './css/Forecast.css';

const ForeacstBlock = ({ temp, src, lang, forecastTemp }) => (
  <div className="forecast">
    {temp.map((_, i) => (
      <div className="forecast-info" key={temp[i]}>
        <h5 data-forecast="translate" className="day">
          {lang.days[new Date().getDay() + i + 1]}
        </h5>
        <div className="forecast-temp">
          <img
            className="forecast-icon"
            src={weatherConditionsIcons[src[i]]}
            alt="weather-icon"
          />
          <p className="temp-val">
            {`${Math.round(forecastTemp[i])}°`}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default ForeacstBlock;
