import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { geoLocation } from '../../constants/api-requsets';
import { recognition, phrase, synth, ruForecast, enForecast } from '../../constants/app-constants';
import { weatherCodesRu, weatherCodesEng, weatherCodesBel } from '../../constants/app-weather-codes';
import { appContext } from '../App';
import './index.css';

const SearchBar = () => {
  const {
    setters: [
      setQuery,,
      setErr,
      setWeatherData,
      setSourceLoaded,,
      setInfoLoading,
    ],
    payload: [
      query,
      lang,,
      {
        cod,
        temp,
        feelsLike,
        humidity,
        speed,
      },
    ],
  } = useContext(appContext);

  const [micActive, setMicActive] = useState(false);
  const [playBtnActive, setPlayBtnActive] = useState(false);
  const [volume, setVolume] = useState(0.5);

  phrase.lang = lang.appLang;
  recognition.lang = lang.appLang;
  const description =
  lang.select === 'EN'
    ? weatherCodesEng[cod]
    : lang.select === 'RU'
      ? weatherCodesRu[cod]
      : weatherCodesBel[cod];
  const langToTranslate = lang.select.toLowerCase();

  const search = (e) => {
    if (e.key === 'Enter' || e.target.id === 'search-but') {
      geoLocation(
        query,
        setInfoLoading,
        setQuery,
        setErr,
        setWeatherData,
        setSourceLoaded,
        langToTranslate,
      );
    }
  }

  const readForecast = (
    temp, description, feelsLike, humidity, speed
  ) => {
    phrase.text = lang.appLang === 'en-US'
      ? enForecast(temp, description, feelsLike, humidity, speed)
      : ruForecast(temp, description, feelsLike, humidity, speed);
    phrase.volume = volume;
    synth.speak(phrase);
    phrase.onend = () => setPlayBtnActive(false);
  }

  const toggleSpeechRecorder = () => {
    setMicActive(!micActive);
    micActive
      ? recognition.stop()
      : recognition.start();
  }

  const toggleAudio = () => {
    if(!playBtnActive) {
      setPlayBtnActive(true);
      readForecast(temp, description, feelsLike, humidity, speed);
    } else {
      synth.cancel();
      setPlayBtnActive(false);
    }
  }

  recognition.onstart = () => setQuery('');

  recognition.onresult = (e) => {
    const { resultIndex } = e;
    const transcript = e.results[resultIndex][0].transcript;
    if (transcript === 'forecast' || transcript === 'прогноз') {
      recognition.stop();
      setMicActive(!micActive);
      setPlayBtnActive(true);
      readForecast(temp, description, feelsLike, humidity, speed);
  		return;
    }

  	if (transcript === 'quieter' || transcript === 'тише') {
      volume > 0.1 ? setVolume(volume - 0.1) : setVolume(volume);
      recognition.stop();
      setMicActive(!micActive);
  		return;
  	}

  	if (transcript === 'louder' || transcript === 'громче') {
      volume < 1 ? setVolume(volume + 0.1) : setVolume(volume);
      recognition.stop();
      setMicActive(!micActive);
  		return;
    }

    setQuery(transcript);
    setMicActive(!micActive);
    recognition.stop();
    geoLocation(
      transcript,
      setInfoLoading,
      setQuery,
      setErr,
      setWeatherData,
      setSourceLoaded,
      langToTranslate,
    );
  }

  return(
    <div className="search-box">
      <input
        id="searcher"
        type="text"
        className="search-bar"
        autoComplete="off"
        placeholder={`${lang.search}...`}
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
      <button
        className="play"
        onClick={toggleAudio}
      >
        {playBtnActive
          ? <FontAwesomeIcon icon={faStop} className="stop-icon"/>
          : <FontAwesomeIcon icon={faPlay} className="play-icon"/>
        }
      </button>
      <button
        className="mic"
        onClick={toggleSpeechRecorder}
      >
        <FontAwesomeIcon
          icon={faMicrophone}
          className={micActive ? 'mic-icon mic-active' : 'mic-icon'}
        />
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
