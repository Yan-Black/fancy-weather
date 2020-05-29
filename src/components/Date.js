import React, { useState, useEffect } from 'react';
import { days, months } from '../base/constants';
import './css/Date.css';

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
        const day = days[regionDate.getDay()];
        const dateZone = regionDate.getDate();
        const month = months[regionDate.getMonth()];
        const year = regionDate.getFullYear();
        
        return `${day} ${dateZone} ${month} ${year}`;
    }

    return(
        <div className="date-block">
            <span>{ showLocaleDate() }</span>
        </div>
    );
}

export default RegionDate;