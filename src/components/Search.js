import React, { useState, useEffect } from 'react';
import './css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { readForecast } from '../helpers/functionalConstants'
import { toggleSpeechRecorder } from '../helpers/functionalConstants';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = new SpeechRecognition();
export const phrase = new SpeechSynthesisUtterance();
export const synth = window.speechSynthesis;

function SearchBar(props) {
	const forecast = 'forecast';
	const playIcon = document.querySelector('.play-icon');
	const stopIcon = document.querySelector('.stop-icon');
	const [lang, setLang] = useState('en-US');

	useEffect(updateLang, [props.lang]);

	function updateLang() {
		switch(props.lang) {
		case 'be':
			setLang('ru-RU');
			break;
		case 'en':
			setLang('en-US');
			break;
		case 'ru':
			setLang('ru-RU');
			break;
		default:
			setLang('en-US');
		}
	}


	recognition.lang = lang;

	recognition.onstart = () => {
		const input = document.getElementById('searcher');
		input.value = '';
	}

	recognition.onresult = (e) => {
		const { resultIndex } = e;
		const but = document.querySelector('.search-but');
		const tscript = e.results[resultIndex][0].transcript;
		if (tscript === forecast || tscript === 'прогноз') {
			readForecast();
			toggleSpeechRecorder(recognition);
			playIcon.classList.remove('active-icon')
			stopIcon.classList.add('active-icon');
			return;
		}

		if (tscript === 'quieter' || tscript === 'тише') {
			readForecast(tscript);
			toggleSpeechRecorder(recognition);
			playIcon.classList.remove('active-icon')
			stopIcon.classList.add('active-icon');
			return;
		}

		if (tscript === 'louder' || tscript === 'громче') {
			readForecast(tscript);
			toggleSpeechRecorder(recognition);
			playIcon.classList.remove('active-icon')
			stopIcon.classList.add('active-icon');
			return;
		}

		props.fn(tscript);
		toggleSpeechRecorder(recognition);
		but.click();
	}

	return(
		<div className="search-box">
			<input id="searcher" type="text" className="search-bar" placeholder="Search..."
				onChange={e => props.fn(e.target.value)}
				value={props.query}
				onKeyPress={props.search} />
			<button className="play">
				<FontAwesomeIcon icon={faPlay} onClick={readForecast} className="play-icon active-icon"/>
				<FontAwesomeIcon icon={faStop} onClick={readForecast} className="stop-icon"/>
			</button>
			<button className="mic">
				<FontAwesomeIcon icon={faMicrophone} onClick={toggleSpeechRecorder.bind(null, recognition)}className="mic-icon"/>
			</button>
			<button data-i18n="search" className="search-but" onClick={props.search}>Search</button>
		</div>
	);
}

export default SearchBar;
