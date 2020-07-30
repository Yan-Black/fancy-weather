import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { geoLocation } from '../../constants/api-requsets';
import { recognition, phrase, synth, ruForecast, enForecast } from '../../constants/app-constants';
import { appContext } from '../../App';
import './index.css';

const SearchBar = () => {
  const {
    setters: [
      setQuery,,,
      setLat,
      setLon,
      setLocationName,
      setForecastTemp,
      setMainTemp,
      setWeather,
      setWeatherDesc,
      setForecast,
      setSourceLoaded,
      setInfoLoading,
      setErrorMessage,
      setOpenErrorModal,
    ],
    payload: [
      lang,
      [temp, feelsLike],,,
      weatherDescription,
      query,,
      {
        main: {
          humidity,
        },
        wind: {
          speed
        }
      },
    ],
  } = useContext(appContext);

  const [micActive, setMicActive] = useState(false);
  const [playBtnActive, setPlayBtnActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const setters = [
    setLon, setLat, setMainTemp, setWeather, setForecastTemp, setForecast, setSourceLoaded,
  ];

  recognition.lang = lang.appLang
  const langToTranslate = lang.select.toLowerCase();

  const search = (e) => {
    if (e.key === 'Enter' || e.target.id === 'search-but') {
      geoLocation(
        setInfoLoading,
        setQuery,
        setLocationName,
        setWeatherDesc,
        setErrorMessage,
        setOpenErrorModal,
        query,
        setters,
        langToTranslate,
      );
    }
  }

  const readForecast = (
    temp, weatherDescription, feelsLike, humidity, speed
  ) => {
    phrase.text = lang.appLang === 'en_EN'
      ? enForecast(temp, weatherDescription, feelsLike, humidity, speed)
      : ruForecast(temp, weatherDescription, feelsLike, humidity, speed);
    phrase.volume = volume;
    synth.speak(phrase);
    phrase.onend = () => setPlayBtnActive(!playBtnActive);
    synth.cancel();
  }

  const toggleSpeechRecorder = () => {
    setMicActive(!micActive);
    micActive
      ? recognition.stop()
      : recognition.start();
  }

  const toggleAudio = () => {
    setPlayBtnActive(!playBtnActive);
    playBtnActive
      ? readForecast(temp, weatherDescription, feelsLike, humidity, speed)
      : synth.cancel();
  }

  recognition.onstart = () => setQuery('');

  recognition.onresult = (e) => {
    const { resultIndex } = e;
    const transcript = e.results[resultIndex][0].transcript;
    if (transcript === 'forecast' || transcript === 'прогноз') {
      recognition.stop();
      setMicActive(!micActive);
      setPlayBtnActive(true);
      readForecast(temp, weatherDescription, feelsLike, humidity, speed);
  		return;
    }

  	if (transcript === 'quieter' || transcript === 'тише') {
      volume > 0.1 ? setVolume(volume - 0.1) : setVolume(volume);
  		return;
  	}

  	if (transcript === 'louder' || transcript === 'громче') {
      volume < 1 ? setVolume(volume + 0.1) : setVolume(volume);
  		return;
    }

    setQuery(transcript);
    setMicActive(!micActive);
    recognition.stop();
    geoLocation(
      setInfoLoading,
      setQuery,
      setLocationName,
      setWeatherDesc,
      setErrorMessage,
      setOpenErrorModal,
      transcript,
      setters,
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
