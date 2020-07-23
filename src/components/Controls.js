import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { langSelectors } from '../constants/app-constants';
import { en, ru, be, farenheit, celsius } from '../constants/app-langs';
import './css/Controls.css';

const Controls = ({ changeImg, setLang, lang }) => {

	// const defaultLang = localStorage.getItem('appLang') || en.appLang;
	const defaultUnits = localStorage.getItem('appUnits') || celsius;

	const [units, setUnits] = useState(defaultUnits);
	const [isListOpen, setListOpen] = useState(false);

	const selectLang = (e) => {
		const { target } = e;
		const langToApply = target.id.slice(-2);
		switch (langToApply) {
		case langToApply === 'EN':
			setLang(en);
			break;
		case langToApply === 'RU':
			setLang(ru);
			break;
		case langToApply === 'BE':
			setLang(be);
			break;
		default: setLang(en);
		}
		localStorage.setItem('appLang', langToApply);
	}

	const openlist = () => setListOpen(!isListOpen);

	const changeActiveUnits = () => {
		if (units === celsius) {
			setUnits(farenheit);
			localStorage.setItem('appUnits', farenheit);
		}	else {
			setUnits(celsius);
			localStorage.setItem('appUnits', celsius);
		}
	};

	return (
		<div className="controls">
			<div className="change-image" onClick={changeImg}>
				<FontAwesomeIcon icon={faSyncAlt} className="rotate-icon"/>
			</div>
			<div
				className="change-lang"
				onClick={openlist}
			>
				<p className="app-lang">{lang.appLang}</p>
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
