import React, { useState, useEffect } from 'react';
import { en, ru, be } from '../constants/app-langs';
import './css/Date.css';

const RegionDate = (props) => {
	const [date, setDate] = useState(new Date());
	const activeLang =
    localStorage.getItem('appLang') === 'EN'
  	? en
  	: localStorage.getItem('appLang') === 'RU'
  		? ru
  		: be;

	useEffect(() => {
		updateDate();
	}, [props.timeZone]);

	const updateDate = () => {
		setDate(new Date());
	}

	const utcOffset = (props.timeZone / 60) / 60;
	const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
	const regionDate = new Date(utc + (3600000 * utcOffset));
	const day = activeLang.days[regionDate.getDay()];
	const dateNum = regionDate.getDate();
	const month = activeLang.monthes[regionDate.getMonth()];
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
