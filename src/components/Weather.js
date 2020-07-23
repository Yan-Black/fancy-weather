import React, { useState, useEffect } from 'react';
import { weatherConditionsIcons } from '../constants/weatherIcons';
import { en, ru, be } from '../constants/app-langs';
import './css/Weather.css';

const WeatherBlock = ({ temp, desc, src, cod }) => {
	const [descTemp, setDescTemp] = useState(desc[1]);
	useEffect(updateDescTemp,[desc[1]]);
	function updateDescTemp() {
		setDescTemp(desc[1]);
	}
	const activeLang =
  localStorage.getItem('appLang') === 'EN'
  	? en
  	: localStorage.getItem('appLang') === 'RU'
  		? ru
  		: be;

	return (
		<div className="weather-area">
			<div className="current-temp">
				<p className="main-temp">{`${temp.toFixed(0)}°`}</p>
				<img className="mobile-icon" src={weatherConditionsIcons[src]} alt=""/>
			</div>
			<div className="current-icon">
				<img className="weather-icon" src={weatherConditionsIcons[src]} alt=""/>
			</div>
			<div className="current-description">
				<ul className="description-list">
					<li data-i18n={cod} className="weather-state">{desc[0]}</li>
					<li>
						<span>
							{activeLang.feelsLike}
						</span>
						<span  className="description-temp">
							{(descTemp).toFixed(0) + '°'}
						</span>
					</li>
					<li>
						<span>
							{activeLang.humidity}
						</span>
						<span className="humidity">
							{`${desc[2]}%`}
						</span>
					</li>
					<li>
						<span>
							{activeLang.wind}
						</span>
						<span className="wind">
							{desc[3]}
						</span>
						<span>
							{activeLang.ms}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default WeatherBlock;
