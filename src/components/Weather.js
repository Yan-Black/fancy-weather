import React, { useState, useEffect } from 'react';
import { weatherConditionsIcons } from '../constants/weatherIcons';
import './css/Weather.css';

const WeatherBlock = ({ temp, desc, src, lang }) => {
  const [weatherDescription, feelsLike, humidity, speed] = desc;

	return (
		<div className="weather-area">
			<div className="current-temp">
				<p className="main-temp">{`${temp.toFixed(0)}°`}</p>
				<img className="mobile-icon" src={weatherConditionsIcons[src]} alt="icon"/>
			</div>
			<div className="current-icon">
				<img className="weather-icon" src={weatherConditionsIcons[src]} alt="icon"/>
			</div>
			<div className="current-description">
				<ul className="description-list">
					<li className="weather-state">{weatherDescription}</li>
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
