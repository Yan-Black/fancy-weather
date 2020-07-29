import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { celsius, farenheit, convertToImperial, convertToMetric, defaultUnits } from '../constants/app-constants';
import { translateApiData, getBackImage } from '../constants/api-requsets';
import { en, ru, be, langSelectors } from '../constants/app-langs';
import { appContext } from '../App';
import './css/Controls.css';

const Controls = () => {
	const [units, setUnits] = useState(defaultUnits);
	const [isListOpen, setListOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		setters: [,,
			setLang,,,
			setLocationName,
			setForecastTemp,
			setMainTemp,,
			setWeatherDesc,,
			setSourceLoaded,
			setInfoLoading,
		],
		payload: [
			lang,
			mainTemp,
			forecastTemp,
			locationName,
			weatherDescription,,,,,,
			infoLoading,
		],
	} = useContext(appContext);
	const openlist = () => setListOpen(!isListOpen);
	const selectLang = (e) => {
		const { target } = e;
		const langToApply = target.id.slice(0, 2);
	  switch (langToApply) {
		case 'en':
			localStorage.setItem('appLang', langToApply);
			setLang(en);
			translateApiData(weatherDescription, setWeatherDesc, langToApply);
			translateApiData(locationName, setLocationName, langToApply);
			break;
		case 'ru':
			localStorage.setItem('appLang', langToApply);
			setLang(ru);
			translateApiData(weatherDescription, setWeatherDesc, langToApply);
			translateApiData(locationName, setLocationName, langToApply);
			break;
		case 'be':
			localStorage.setItem('appLang', langToApply);
			setLang(be);
			translateApiData(weatherDescription, setWeatherDesc, langToApply);
			translateApiData(locationName, setLocationName, langToApply);
		  break;
	  default: setLang(en);
	  }
	}

	const changeActiveUnits = () => {
		if (units === celsius) {
			setUnits(farenheit);
			setForecastTemp(forecastTemp.map(convertToImperial));
			setMainTemp(mainTemp.map(convertToImperial));
			localStorage.setItem('appUnits', farenheit);
		}	else {
			setUnits(celsius);
			setForecastTemp(forecastTemp.map(convertToMetric));
			setMainTemp(mainTemp.map(convertToMetric));
			localStorage.setItem('appUnits', celsius);
		}
	};

	const imageHandler = () => getBackImage(null, setSourceLoaded, setInfoLoading);

	return (
		<div className="controls">
			<div className="change-image" onClick={imageHandler} >
				<FontAwesomeIcon
					icon={faSyncAlt}
					className={infoLoading ? 'rotate-icon load-image' : 'rotate-icon'}
				/>
			</div>
			<div className="change-lang" onClick={openlist}>
				<p className="app-lang">{lang.select}</p>
				<FontAwesomeIcon icon={faAngleDown} />
				<ul
					className={
						isListOpen
							? 'lang-list'
							: 'hidden-list'
					}
					onClick={selectLang}
				>
					{langSelectors.map((sel) => (
						<li
							className="lang-selector"
							id={sel.id}
							key={sel.id}
						>
							{sel.lang}
						</li>
					))}
				</ul>
			</div>
			<div className="change-units">
				<button
					className={
						units === celsius
							? 'change-to-farenheit active-unit'
							: 'change-to-farenheit'
					}
					onClick={changeActiveUnits}>
					{'C°'}
				</button>
				<button
					className={
						units === farenheit
							? 'change-to-celsius active-unit'
							: 'change-to-celsius'
					}
					onClick={changeActiveUnits}
				>
					{'F°'}
				</button>
			</div>
		</div>
	)
}

export default Controls;
