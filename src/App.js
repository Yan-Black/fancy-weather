import React, { useState, useEffect } from 'react';
import Error from './components/Error';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import Preloader from './components/Preloader';
import placeholder from './assets/images/background.jpg';
import Main from './components/Main';
import { en } from './constants/app-langs';
import { getUserLocation, geoLocation } from './constants/api-requsets';

const App = () => {
	const [query, setQuery] = useState('');
	const [lang, setLang] = useState(en);
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState({});
	const [forecast, setForecast] = useState(null);
	const [latitude, setLat] = useState(0);
	const [longtitude, setLon] = useState(0);
	const [sourceLoaded, setSourceLoaded] = useState(null);
	const [countryName, setCountryName] = useState('');
	const [cityName, setCityName] = useState('');
	const [weatherDescription, setWeatherDesc] = useState('');
	const [pictureDescription, setPictureDesc] = useState('');
	const [pictureCity, setPictureCity] = useState('');

	const search = (e) => {
		if (e.key === 'Enter' || e.target.id === 'search-but') {
			geoLocation(
				query || city,
				setLon,
				setLat,
				setCityName,
				setCountryName,
				setQuery,
				setWeather,
				setPictureDesc,
				setPictureCity,
				setWeatherDesc,
				setForecast,
			);
		}
	}

	useEffect(() => {
		getUserLocation(
			setLon,
			setLat,
			setCityName,
			setCountryName,
			setQuery,
			setWeather,
			setPictureDesc,
			setPictureCity,
			setWeatherDesc,
			setForecast,
		);
	}, []);

	return (
		<div
			className="App"
			style={{
				backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})`,
			}}
		>
			{/* <Preloader /> */}
			<main>
				<div className="header">
					<Controls setLang={setLang} lang={lang} />
					<Error lang={lang} />
					<SearchBar
						setQuery={setQuery}
						query={query}
						search={search}
						lang={lang}
					/>
				</div>
				{forecast &&
					<Main
						lang={lang}
						weather={weather}
						city={cityName}
						country={countryName}
						weatherDescription={weatherDescription}
						forecast={forecast} lng={longtitude}
						lat={latitude}
					/>}
			</main>
		</div>
	);
}

export default App;
