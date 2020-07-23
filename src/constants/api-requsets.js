import {
	userLocationUrl,
	geoLocationUrl,
	geoWeatherUrl,
	forecastUrl,
	translateUrl,
	backgroundUrl,
} from './api-urls';

export const getUserLocation = async (
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
) => {
	try {
		const rawResp = await fetch(userLocationUrl);
		const resp = await rawResp.json();
		const { city } = resp;
		geoLocation(
			city,
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
	catch(err) {
		window.console.log(err);
	}
}

export const geoLocation = async (
	city,
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
) => {
	try {
		const rawResp = await fetch(geoLocationUrl(city));
		const resp = await rawResp.json();
		const { results: [
			{
				geometry: { lat, lng },
				components: { country, state }
			}
		]
		} = resp;
		setLon(lng);
		setLat(lat);
		getWeatherData(
			lat,
			lng,
			setQuery,
			setWeather,
			setPictureDesc,
			setPictureCity,
			setWeatherDesc
		);
		getForecast(lat, lng, setForecast);
		translateApiData(country || state, setCityName);
		translateApiData(country, setCountryName);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getWeatherData = async (
	lat,
	lon,
	setQuery,
	setWeather,
	setPictureDesc,
	setPictureCity,
	setWeatherDesc,
) => {
	try {
		const rawResp = await fetch(geoWeatherUrl(lat, lon));
		const resp = await rawResp.json();
		const {
			name,
			weather: [
				{
					main,
					description,
				}
			]
		} = resp;
		setWeather(resp);
		setQuery('');
		setPictureDesc(main);
		setPictureCity(name);
		translateApiData(description, setWeatherDesc);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getForecast = async (lat, lon, setForecast) => {
	try {
		const rawResp = await fetch(forecastUrl(lat, lon));
		const resp = await rawResp.json();
		setForecast(resp);
	}
	catch(err) {
		window.console.log(err);
	}
}

export	const translateApiData = async (data, fn) => {
	try {
		const rawResp = await fetch(translateUrl(data));
		const resp = await rawResp.json();
		const { text } = resp;
		const translate = text[0];
		fn(translate);
	}
	catch(err) {
		window.console.log(err);
	}
}

const LazyBackgroundLoader = (src, setSourceLoaded) => {
	const img = new Image();
	img.src = src;
	img.onload = () => {
		setSourceLoaded(src);
	};
}

export const getBackImage = async (setSourceLoaded) => {
	try {
		const rawResp = await fetch(backgroundUrl);
		const resp = await rawResp.json();
		const { urls: { full } } = resp;
		LazyBackgroundLoader(full, setSourceLoaded);
	}
	catch(err) {
		window.console.log(err);
	}
}

