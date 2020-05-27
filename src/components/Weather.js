import React from 'react';
import './css/Weather.css';

function WeatherBlock(props) {
    return(
        <div className="weather-area">
            <div className="current-temp">
                <p className="main-temp">{(props.temp).toFixed(0)}°</p>
            </div>
            <div className="current-icon">
                <img className="weather-icon" src={props.src} alt=""/>
            </div>
            <div className="current-description">
            <ul className="description-list">
                <li>{props.desc[0]}</li>
                <li>Feels like: {(props.desc[1]).toFixed(0)}°</li>
                <li>Humidity: {props.desc[2]}%</li>
                <li>Wind: {props.desc[3]} m/s</li>
                </ul>
            </div>
        </div>
    );
}

export default WeatherBlock;