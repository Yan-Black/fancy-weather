import React, { useState, useEffect } from 'react';
import './css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { readForecast } from '../constants/functionalConstants'
import { toggleSpeechRecorder } from '../constants/functionalConstants';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = new SpeechRecognition();
export const phrase = new SpeechSynthesisUtterance();
export const synth = window.speechSynthesis;

const SearchBar = ({ setQuery, query, search, lang }) => {
	// const forecast = 'forecast';
	// const playIcon = document.querySelector('.play-icon');
	// const stopIcon = document.querySelector('.stop-icon');
	const [activeLang, setActiveLang] = useState(lang);
	// switch (appLang) {
	// case appLang === 'EN':
	// 	setActiveLang(en);
	// 	break;
	// case appLang === 'RU':
	// 	setActiveLang(ru);
	// 	break;
	// case appLang === 'BE':
	// 	setActiveLang(be);
	// 	break;
	// default: setActiveLang(en);
	// }
	useEffect(() => {
		setActiveLang(lang);
	}, [lang]);
	// recognition.lang = lang;

	// recognition.onstart = () => {
	// 	const input = document.getElementById('searcher');
	// 	input.value = '';
	// }

	// recognition.onresult = (e) => {
	// 	const { resultIndex } = e;
	// 	const but = document.querySelector('.search-but');
	// 	const tscript = e.results[resultIndex][0].transcript;
	// 	if (tscript === forecast || tscript === 'прогноз') {
	// 		readForecast();
	// 		toggleSpeechRecorder(recognition);
	// 		playIcon.classList.remove('active-icon')
	// 		stopIcon.classList.add('active-icon');
	// 		return;
	// 	}

	// 	if (tscript === 'quieter' || tscript === 'тише') {
	// 		readForecast(tscript);
	// 		toggleSpeechRecorder(recognition);
	// 		playIcon.classList.remove('active-icon')
	// 		stopIcon.classList.add('active-icon');
	// 		return;
	// 	}

	// 	if (tscript === 'louder' || tscript === 'громче') {
	// 		readForecast(tscript);
	// 		toggleSpeechRecorder(recognition);
	// 		playIcon.classList.remove('active-icon')
	// 		stopIcon.classList.add('active-icon');
	// 		return;
	// 	}

	// 	fn(tscript);
	// 	toggleSpeechRecorder(recognition);
	// 	but.click();
	// }

	return(
		<div className="search-box">
			<input id="searcher" type="text" className="search-bar" placeholder="Search..."
				onChange={e => setQuery(e.target.value)}
				value={query}
				onKeyPress={search}
			/>
			{/* <button className="play">
				<FontAwesomeIcon icon={faPlay} onClick={readForecast} className="play-icon active-icon"/>
				<FontAwesomeIcon icon={faStop} onClick={readForecast} className="stop-icon"/>
			</button>
			<button className="mic">
				<FontAwesomeIcon icon={faMicrophone} onClick={toggleSpeechRecorder.bind(null, recognition)}className="mic-icon"/>
			</button> */}
			<button
				id="search-but"
				className="search-but"
				onClick={search}
			>
				{activeLang.search}
			</button>
		</div>
	);
}

export default SearchBar;
