import React, { useState, useEffect } from 'react';
import { chooseDaysMonthArray } from '../base/functionalConstants';
import './css/Forecast.css';

function ForeacstBlock(props) {
    const [temp, setTemp] = useState(props.temp);
    useEffect(updateTemp,[props.temp]);
    function updateTemp() {
        setTemp(props.temp);
    }
    return (
        <div className="forecast">
            <div className="forecast-info">
                <h5 data-forecast="translate" className="day">{chooseDaysMonthArray()[new Date().getDay()]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[0]} alt=""/>
                    <p className="temp-val">{temp[0].toFixed(0) + '°'}</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 data-forecast="translate" className="day">{chooseDaysMonthArray()[new Date().getDay() + 1]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[1]} alt=""/>
                    <p className="temp-val">{temp[1].toFixed(0) + '°'}</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 data-forecast="translate" className="day">{chooseDaysMonthArray()[new Date().getDay() + 2]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[2]} alt=""/>
                    <p className="temp-val">{temp[2].toFixed(0) + '°'}</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 data-forecast="translate" className="day">{chooseDaysMonthArray()[new Date().getDay() + 3]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[3]} alt=""/>
                    <p className="temp-val">{temp[3].toFixed(0) + '°'}</p>
                </div>
            </div>
            <div className="forecast-info">
                <h5 data-forecast="translate" className="day">{chooseDaysMonthArray()[new Date().getDay() + 4]}</h5>
                <div className="forecast-temp">
                    <img className="forecast-icon" src={props.src[4]} alt=""/>
                    <p className="temp-val">{temp[4].toFixed(0) + '°'}</p>
                </div>
            </div>
        </div>
    );
}

export default ForeacstBlock;