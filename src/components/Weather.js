import React, { useState, useEffect } from 'react';
import './css/Weather.css';

function WeatherBlock(props) {
    const [temp, setTemp] = useState(props.temp);
    useEffect(updateTemp,[props.temp]);
    function updateTemp() {
        setTemp(props.temp);
    }
    return(
        <div className="weather-area">
            <div className="current-temp">
                <p className="main-temp">{temp.toFixed(0) + '°'}</p>
            </div>
            <div className="current-icon">
                <img className="weather-icon" src={props.src} alt=""/>
            </div>
            <div className="current-description">
            <ul className="description-list">
                <li data-i18n={props.cod} className="weather-state">{props.desc[0]}</li>
                <li><span data-i18n="feelsLike">Feels like: </span>{(props.desc[1]).toFixed(0)}°</li>
                <li><span data-i18n="humidity">Humidity: </span>{props.desc[2]}%</li>
                <li><span data-i18n="wind">Wind: </span>{props.desc[3]}<span data-i18n="ms">m/s</span></li>
                </ul>
            </div>
        </div>
    );
}

export default WeatherBlock;