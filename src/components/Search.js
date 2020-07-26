import React, { useState, useEffect } from 'react';
import { geoLocation } from '../constants/api-requsets';
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

const SearchBar = ({ setters, lang, query, setQuery }) => {
  const langToTranslate = lang.select.toLowerCase();
  const [
    setLoading,
    setLat,
    setLon,
    setLocationName,
    setForecastTemp,
    setMainTemp,
    setWeather,
    setWeatherDesc,
    setForecast,
    setSourceLoaded,
  ] = setters;

  const search = (e) => {
		if (e.key === 'Enter' || e.target.id === 'search-but') {
			geoLocation(
        setLoading,
				query,
				setLon,
				setLat,
				setLocationName,
        setQuery,
        setForecastTemp,
        setMainTemp,
				setWeather,
				setWeatherDesc,
        setForecast,
        setSourceLoaded,
        langToTranslate,
			);
		}
	}
	recognition.lang = lang.appLang;

	recognition.onstart = () => {
    setQuery('');
	}

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
      <input
        id="searcher"
        type="text"
        className="search-bar"
        placeholder={`${lang.search}...`}
				onChange={e => setQuery(e.target.value)}
				value={query}
				onKeyPress={search}
			/>
			<button className="play">
				<FontAwesomeIcon icon={faPlay} className="play-icon active-icon"/>
				<FontAwesomeIcon icon={faStop} className="stop-icon"/>
			</button>
			<button className="mic">
				<FontAwesomeIcon icon={faMicrophone} className="mic-icon"/>
			</button>
			<button
				id="search-but"
				className="search-but"
				onClick={search}
			>
				{lang.search}
			</button>
		</div>
	);
}

export default SearchBar;
