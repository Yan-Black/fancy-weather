import React, { useState, useEffect } from 'react';
import Error from './components/Error';
import Controls from './components/Controls';
import SearchBar from './components/Search';
import Preloader from './components/Preloader';
import placeholder from './assets/images/background.jpg';
import Main from './components/Main';
import { en, ru, be } from './constants/app-langs';
import { getUserLocation } from './constants/api-requsets';

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

	useEffect(() => {
		getUserLocation(
      setLoading,
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
	}, []);

	return (
		<div
			className="App"
			style={{
				backgroundImage: `url(${sourceLoaded ? sourceLoaded : placeholder})`,
			}}
		>
      {loading
       ? (<Preloader />)
			 : (<main>
          <div className="header">
            <Controls
              setters={[
                setLang,
                setLocationName,
                setWeatherDesc,
                setForecastTemp,
                setMainTemp,
              ]}
              lang={lang}
              mainTemp={mainTemp}
              forecastTemp={forecastTemp}
              locationToTranslate={locationName}
              descToTranslate={weatherDescription}
            />
            <Error lang={lang} />
            <SearchBar
              setters={[
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
              ]}
              lang={lang}
              query={query}
              setQuery={setQuery}
            />
          </div>
          {forecast &&
            <Main
              lang={lang}
              weather={weather}
              mainTemp={mainTemp}
              forecastTemp={forecastTemp}
              locationName={locationName}
              weatherDescription={weatherDescription}
              forecast={forecast}
              lng={longtitude}
              lat={latitude}
            />}
			</main>)}
		</div>
	);
}

export default App;
