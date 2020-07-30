import React, { useState, useEffect, useContext } from 'react';
import { appContext } from '../../../App';
import './index.css';

const RegionDate = () => {
  const { payload: [lang,,,,,,, { timezone }] } = useContext(appContext);
  const [date, setDate] = useState(new Date());

  const utcOffset = (timezone / 60) / 60;
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const regionDate = new Date(utc + (3600000 * utcOffset));
  const day = lang.daysShort[regionDate.getDay()];
  const dateNum = regionDate.getDate();
  const month = lang.monthes[regionDate.getMonth()];
  const year = regionDate.getFullYear();

  useEffect(() => setDate(new Date()), [timezone]);

  return (
    <div className="date-block">
      <span>
        {day}
        {' '}
      </span>
      <span>
        {dateNum}
        {' '}
      </span>
      <span>
        {month}
        {' '}
      </span>
      <span>
        {year}
      </span>
    </div>
  );
}

export default RegionDate;
