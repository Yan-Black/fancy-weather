import React, { useContext } from 'react';
import { weatherConditionsIcons } from '../constants/weatherIcons';
import { appContext } from '../App';
import './css/Forecast.css';

const ForeacstBlock = () => {
	const { payload: [lang,, forecastTemp,,,, forecast] } = useContext(appContext);
	return (
		<div className="forecast">
			{forecast.map(({ weather: [{ icon }] }, i) => (
				<div className="forecast-info" key={forecastTemp[i]}>
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
							{`${Math.round(forecastTemp[i])}°`}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};
export default ForeacstBlock;
