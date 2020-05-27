import React from 'react';
import './css/Forecast.css';

function ForeacstBlock(props) {
    return (
        <div className="forecast">
            <div className="forecast-info">
                <h5 className="day">{props.day[0]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[0]} alt=""/>
                    <p className="temp-val">{(props.temp[0]).toFixed(0)}°</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 className="day">{props.day[1]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[1]} alt=""/>
                    <p className="temp-val">{(props.temp[1]).toFixed(0)}°</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 className="day">{props.day[2]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[2]} alt=""/>
                    <p className="temp-val">{(props.temp[2]).toFixed(0)}°</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 className="day">{props.day[3]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[3]} alt=""/>
                    <p className="temp-val">{(props.temp[3]).toFixed(0)}°</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 className="day">{props.day[4]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[4]} alt=""/>
                    <p className="temp-val">{(props.temp[4]).toFixed(0)}°</p>
                </div>
            </div>
        </div>
    );
}

export default ForeacstBlock;