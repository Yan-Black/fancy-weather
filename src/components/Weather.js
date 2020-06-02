import React, { useState, useEffect } from 'react';
import { weatherConditionsIcons } from '../base/weatherIcons';
import './css/Weather.css';

function WeatherBlock(props) {
    const [temp, setTemp] = useState(props.temp);
    useEffect(updateTemp,[props.temp]);
    function updateTemp() {
        setTemp(props.temp);
    }
    const [descTemp, setDescTemp] = useState(props.desc[1]);
    useEffect(updateDescTemp,[props.desc[1]]);
    function updateDescTemp() {
        setDescTemp(props.desc[1]);
    }
    return(
        <div className="weather-area">
            <div className="current-temp">
                <p className="main-temp">{temp.toFixed(0) + '°'}</p>
                <img className="mobile-icon" src={weatherConditionsIcons[props.src]} alt=""/>
            </div>
            <div className="current-icon">
                <img className="weather-icon" src={weatherConditionsIcons[props.src]} alt=""/>
            </div>
            <div className="current-description">
            <ul className="description-list">
                <li data-i18n={props.cod} className="weather-state">{props.desc[0]}</li>
                <li><span data-i18n="feelsLike">Feels like: </span><span  className="description-temp">{(descTemp).toFixed(0) + '°'}</span></li>
                <li><span data-i18n="humidity">Humidity: </span><span className="humidity">{props.desc[2]}%</span></li>
                <li><span data-i18n="wind">Wind: </span><span className="wind">{props.desc[3]}</span><span data-i18n="ms">&nbsp;m/s</span></li>
                </ul>
            </div>
        </div>
    );
}

export default WeatherBlock;