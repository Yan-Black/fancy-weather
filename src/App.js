import React, { useState, useEffect, createContext } from 'react';
import Error from './components/Error';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import Preloader from './components/Preloader';
import placeholder from './assets/images/background.jpg';
import Main from './components/Main';
import { en, ru, be } from './constants/app-langs';
import { getUserLocation } from './constants/api-requsets';

export const appContext = createContext();

const App = () => {
	const { appLang } = localStorage;
	let langToApply;

	switch (appLang) {
	case 'en':
		langToApply = en;
		break;
	case 'ru':
		langToApply = ru;
		break;
	case 'be':
		langToApply = be;
		break;
	default: langToApply = en;
	}

	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [infoLoading, setInfoLoading] = useState(false);
	const [lang, setLang] = useState(langToApply);
	const [weather, setWeather] = useState({});
	const [forecast, setForecast] = useState(null);
	const [latitude, setLat] = useState(0);
	const [longtitude, setLon] = useState(0);
	const [sourceLoaded, setSourceLoaded] = useState(null);
	const [locationName, setLocationName] = useState('');
	const [weatherDescription, setWeatherDesc] = useState('');
	const [forecastTemp, setForecastTemp] = useState([]);
	const [mainTemp, setMainTemp] = useState([]);
	const langToTranslate = lang.select.toLowerCase();

	const ctx = {
		setters: [
			setQuery,
			setLoading,
			setLang,
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
		],
		payload: [
			lang,
			mainTemp,
			forecastTemp,
			locationName,
			weatherDescription,
			query,
			forecast,
			weather,
			latitude,
			longtitude,
			infoLoading,
		]
	}
	const setters = [setLon, setLat, setMainTemp, setWeather, setForecastTemp, setForecast, setSourceLoaded];
	useEffect(() => getUserLocation(
		setLoading, setQuery, setLocationName, setWeatherDesc, setters, langToTranslate,
	), []);

	return (
		<appContext.Provider value={ctx} >
			<div
				className="App"
				style={{
					backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})`,
				}}
			>
				{loading && <Preloader/>}
				<div className="weather-wrapper">
					<div className="header">
						<Controls />
						<Error />
						<SearchBar/>
					</div>
					{forecast && <Main />}
				</div>
			</div>
		</appContext.Provider>
	);
}

export default App;
