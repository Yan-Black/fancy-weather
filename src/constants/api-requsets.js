import {
	userLocationUrl,
	geoLocationUrl,
	geoWeatherUrl,
	forecastUrl,
	translateUrl,
	backgroundUrl,
} from './api-urls';
import { regex, forecastRegex } from './app-constants';

export const getUserLocation = async (
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
  lang,
) => {
	try {
    setLoading(true);
		const rawResp = await fetch(userLocationUrl);
    const resp = await rawResp.json();
    const { city, country } = resp;
		geoLocation(
      setLoading,
      `${city} ${country}`,
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
      lang,
		);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const geoLocation = async (
  setLoading,
	city,
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
  lang,
) => {
	try {
    setLoading(true);
		const rawResp = await fetch(geoLocationUrl(city));
    const resp = await rawResp.json();
		const { results: [
			{
        formatted,
				geometry: { lat, lng },
			}
		]
    } = resp;
    const cityCountry = formatted.replace(regex, ',');
		setLon(lng);
		setLat(lat);
		getWeatherData(
			lat,
			lng,
      setQuery,
      setMainTemp,
			setWeather,
      setWeatherDesc,
      lang,
    );
    getForecast(
      lat,
      lng,
      setForecast,
      setForecastTemp,
      setLoading,
      setSourceLoaded,
    );
		translateApiData(
      cityCountry, setLocationName, lang,
    );
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getWeatherData = async (
	lat,
	lon,
  setQuery,
  setMainTemp,
  setWeather,
  setWeatherDesc,
  lang,
) => {
	try {
		const rawResp = await fetch(geoWeatherUrl(lat, lon));
		const resp = await rawResp.json();
		const {
      main: {
        temp,
        feels_like,
      },
			weather: [
				{
          description,
        },
      ],
    } = resp;

    setMainTemp([temp, feels_like]);
		setWeather(resp);
    setQuery('');
		translateApiData(description, setWeatherDesc, lang);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getForecast = async (
  lat,
  lon,
  setForecast,
  setForecastTemp,
  setLoading,
  setSourceLoaded,
) => {
	try {
		const rawResp = await fetch(forecastUrl(lat, lon));
    const resp = await rawResp.json();
    const forecastList = resp.list.filter(({ dt_txt }) => forecastRegex.test(dt_txt));
    const forecastValues = [];
    forecastList.forEach(
      ({ main: {temp_max, temp_min} }) => forecastValues.push(((temp_max + temp_min) / 2))
    );
    setForecastTemp(forecastValues);
    setForecast(forecastList);
    getBackImage(setSourceLoaded, setLoading);
	}
	catch(err) {
		window.console.log(err);
	}
}

export	const translateApiData = async (data, setPropTranslate, lang) => {
	try {
		const rawResp = await fetch(translateUrl(data, lang));
		const resp = await rawResp.json();
		const { text } = resp;
		const [translate] = text;
		setPropTranslate(translate);
	}
	catch(err) {
		window.console.log(err);
	}
}

const LazyBackgroundLoader = (src, setSourceLoaded, setLoading) => {
	const img = new Image();
	img.src = src;
	img.onload = () => {
    setSourceLoaded(src);
    setLoading(false);
  };
  img.onerror = () => {
    setLoading(false);
  }
}

export const getBackImage = async (setSourceLoaded, setLoading) => {
	try {
		const rawResp = await fetch(backgroundUrl);
		const resp = await rawResp.json();
		const { urls: { full } } = resp;
		LazyBackgroundLoader(full, setSourceLoaded, setLoading);
	}
	catch(err) {
		window.console.log(err);
	}
}

