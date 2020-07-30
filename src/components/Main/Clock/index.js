import React, { useState, useEffect, useContext } from 'react';
import { appContext } from '../../../App';
import './index.css';

const Clock = () => {
  const { payload: [,,,,,,, { timezone }] } = useContext(appContext);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000 );

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [timezone]);

  const showLocaleTime = () => {
    const utcOffset = (timezone / 60) / 60;
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const regionDate = new Date(utc + (3600000 * utcOffset));

    return regionDate.toLocaleTimeString();
  }

  return(
    <div className="clock">
      <span className="region-date">{ showLocaleTime() }</span>
    </div>
  );
}

export default Clock;
