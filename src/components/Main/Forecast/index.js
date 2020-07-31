import React, { useContext } from 'react';
import { weatherConditionsIcons } from '../../../constants/app-weather-icons';
import { appContext } from '../../App';
import './index.css';

const ForeacstBlock = () => {
  const { payload: [, lang,, { forecast, forecastTemps },] } = useContext(appContext);
  return (
    <div className="forecast">
      {forecast.map(({ weather: [{ icon }] }, i) => (
        <div className="forecast-info" key={forecastTemps[i]}>
          <h5 data-forecast="translate" className="day">
            {lang.days[new Date().getDay() + i + 1]}
          </h5>
          <div className="forecast-temp">
            <img
              className="forecast-icon"
              src={weatherConditionsIcons[icon]}
              alt="weather-icon"
            />
            <p className="temp-val">
              {`${Math.round(forecastTemps[i])}°`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ForeacstBlock;
