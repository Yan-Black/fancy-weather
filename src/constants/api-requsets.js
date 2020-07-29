import {
	userLocationUrl,
	geoLocationUrl,
	geoWeatherUrl,
	forecastUrl,
	translateUrl,
	backgroundUrl,
} from './api-urls';
import { regex, forecastRegex } from './app-constants';
import placeholder from '../assets/images/background.jpg';

export const getUserLocation = async (
	setLoading,
	setQuery,
	setLocationName,
	setWeatherDesc,
	setters,
	lang,
) => {
	try {
		setLoading(true);
		const rawResp = await fetch(userLocationUrl);
		const resp = await rawResp.json();
		const { city, country } = resp;
		const locationName = `${city} ${country}`;
		geoLocation(
			setLoading,
			setQuery,
			setLocationName,
			setWeatherDesc,
			locationName,
			setters,
			lang,
		);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const geoLocation = async (
	setLoading,
	setQuery,
	setLocationName,
	setWeatherDesc,
	city,
	setters,
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
		const locationName = formatted.replace(regex, ',');
		const dataToResolve = [lng, lat];
		getWeatherData(
			lat,
			lng,
			dataToResolve,
			setters,
			lang,
			setLoading,
			setQuery,
			setLocationName,
			locationName,
			setWeatherDesc,
		);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getWeatherData = async (
	lat,
	lng,
	dataToResolve,
	setters,
	lang,
	setLoading,
	setQuery,
	setLocationName,
	locationName,
	setWeatherDesc,
) => {
	try {
		const rawResp = await fetch(geoWeatherUrl(lat, lng));
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
		dataToResolve.push([temp, feels_like]);
		dataToResolve.push(resp);
		setQuery('');
		getForecast(
			lat,
			lng,
			dataToResolve,
			setters,
			lang,
			setLoading,
			setLocationName,
			locationName,
			setWeatherDesc,
			description,
		);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const getForecast = async (
	lat,
	lng,
	dataToResolve,
	setters,
	lang,
	setLoading,
	setLocationName,
	locationName,
	setWeatherDesc,
	description,
) => {
	try {
		const rawResp = await fetch(forecastUrl(lat, lng));
		const resp = await rawResp.json();
		const forecastList = resp.list.filter(({ dt_txt }) => forecastRegex.test(dt_txt));
		const forecastValues = [];
		forecastList.forEach(
			({ main: {temp_max, temp_min} }) => forecastValues.push(((temp_max + temp_min) / 2))
		);
		dataToResolve.push(forecastValues);
		dataToResolve.push(forecastList);
		getBackImage(
			dataToResolve,
			setters,
			setLoading,
			setLocationName,
			locationName,
			setWeatherDesc,
			description,
			lang,
		);
	}
	catch(err) {
		window.console.log(err);
	}
}

export const translateApiData = async (data, setPropTranslate, lang) => {
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

const LazyBackgroundLoader = (
	src,
	dataToResolve,
	setters,
	setLoading,
	setLocationName,
	locationName,
	setWeatherDesc,
	description,
	lang,
) => {
	const img = new Image();
	img.src = src;
	img.onload = async () => {
		if (!dataToResolve) {
			setters(src);
			setLoading(false);
		} else {
			resolveAllData(
				dataToResolve,
				setters,
				setLoading,
				setLocationName,
				locationName,
				setWeatherDesc,
				description,
				lang,
			);
		}
	};
	img.onerror = () => {
		setLoading(false);
	}
}

export const getBackImage = async (
	dataToResolve,
	setters,
	setLoading,
	setLocationName,
	locationName,
	setWeatherDesc,
	description,
	lang,
) => {
	setLoading(true);
	try {
		const rawResp = await fetch(backgroundUrl);
		const resp = await rawResp.json();
		const { urls: { regular } } = resp;
		dataToResolve && dataToResolve.push(regular);
		LazyBackgroundLoader(
			regular,
			dataToResolve,
			setters,
			setLoading,
			setLocationName,
			locationName,
			setWeatherDesc,
			description,
			lang,
		);
	}
	catch(err) {
		LazyBackgroundLoader(
			placeholder,
			dataToResolve,
			setters,
			setLoading,
			setLocationName,
			locationName,
			setWeatherDesc,
			description,
			lang,
		);
	}
}

const resolveAllData = (
	dataToResolve,
	setters,
	setLoading,
	setLocationName,
	locationName,
	setWeatherDesc,
	description,
	lang,
) => {
	translateApiData(locationName, setLocationName, lang);
	translateApiData(description, setWeatherDesc, lang);
	setters.forEach((setter, i) => setter(dataToResolve[i]));
	setLoading(false);
}
