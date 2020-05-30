import React, { useState, useEffect } from 'react';
import { daysRu, daysBel, daysEng, monthsEng, monthsRu, monthsBel } from '../base/translateConstants';
import './css/Date.css';

const lang = localStorage.getItem('lang');
let daysArr, monthsArr;

switch(lang) {
    case 'ru':
        daysArr = daysRu;
        monthsArr = monthsRu;
        break;
    case 'en':
        daysArr = daysEng;
        monthsArr = monthsEng;
        break;
    case 'be':
        daysArr = daysBel;
        monthsArr = monthsBel;
        break;
    default:
        daysArr = daysEng;
        monthsArr = monthsEng;
        break;
}

function RegionDate(props) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        updateDate();
    }, [props.timeZone]);
    
    function updateDate() {
        setDate(new Date());
    }

    function showLocaleDate() {
        const utcOffset = (props.timeZone / 60) / 60;
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const regionDate = new Date(utc + (3600000 * utcOffset));
        const day = daysArr[regionDate.getDay()];
        const dateNum = regionDate.getDate();
        const month = monthsArr[regionDate.getMonth()];
        const year = regionDate.getFullYear();
        
        return  (
            <>
            <span data-i18n="day">{day}&nbsp;</span><span>{dateNum}&nbsp;</span><span data-i18n="month">{month}&nbsp;</span><span>{year}</span>
            </>
        );
    }

    return(
        <div className="date-block">
            { showLocaleDate() }
        </div>
    );
}

export default RegionDate;