import React, { useState, useEffect } from 'react';
import './css/Clock.css';

const Clock = ({ timeZone }) => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval( () => tick(), 1000 );

		return function cleanup() {
			clearInterval(timerID);
		};
	}, [timeZone]);

	function tick() {
		setDate(new Date());
	}

	function showLocaleTime() {
		const utcOffset = (timeZone / 60) / 60;
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
