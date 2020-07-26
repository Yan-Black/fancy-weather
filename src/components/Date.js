import React, { useState, useEffect } from 'react';
import './css/Date.css';

const RegionDate = ({ timeZone, lang }) => {
  const [date, setDate] = useState(new Date());

	useEffect(() => setDate(new Date()), [timeZone]);

	const utcOffset = (timeZone / 60) / 60;
	const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
	const regionDate = new Date(utc + (3600000 * utcOffset));
	const day = lang.daysShort[regionDate.getDay()];
	const dateNum = regionDate.getDate();
	const month = lang.monthes[regionDate.getMonth()];
	const year = regionDate.getFullYear();

	return(
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
