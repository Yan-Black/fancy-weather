import React from 'react';
import { en, ru, be } from '../constants/app-langs';
import { weatherConditionsIcons } from '../constants/weatherIcons';
import './css/Forecast.css';

const ForeacstBlock = ({ temp, src }) => {
	const activeLang =
  localStorage.getItem('appLang') === 'EN'
  	? en
  	: localStorage.getItem('appLang') === 'RU'
  		? ru
  		: be;
	return (
		<div className="forecast">
			{temp.map((_, i) => (
				<div className="forecast-info" key={temp[i]}>
					<h5 data-forecast="translate" className="day">
						{activeLang.days[new Date().getDay() + i + 1]}
					</h5>
					<div className="forecast-temp">
						<img
							className="forecast-icon"
							src={weatherConditionsIcons[src[0]]}
							alt="weather-icon"
						/>
						<p className="temp-val">{temp[i].toFixed(0) + '°'}</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default ForeacstBlock;
