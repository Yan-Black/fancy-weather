import {
	BACKGROUND_API,
	ID_API,
	WEATHER_API,
	TRANSLATE_API,
	GEOLOCATION_API
} from './api-keys';
import { celsius, en } from './app-langs';

const { appUnits, appLang } = localStorage;

export const userLocationUrl = `${ID_API.base}json?token=${ID_API.key}`;
export const geoLocationUrl = (query) => `${GEOLOCATION_API.base}json?q=${query}&key=${GEOLOCATION_API.key}&pretty=1&no_annotations=1`;
export const geoWeatherUrl = (lat, lon) => `${WEATHER_API.base}weather?lat=${lat}&lon=${lon}&units=${appUnits || celsius}&appid=${WEATHER_API.key}`;
export const translateUrl = (data) => `${TRANSLATE_API.base}tr.json/translate?key=${TRANSLATE_API.key}&text=${data}&lang=${appLang.toLowerCase() || en.appLang.toLowerCase()}`;
export const forecastUrl = (lat, lon) => `${WEATHER_API.base}forecast?lat=${lat}&lon=${lon}&units=${appUnits || celsius}&appid=${WEATHER_API.key}`;
export const backgroundUrl = `${BACKGROUND_API.base}/random?orientation=landscape&per_page=1&featured=nature&query=Minsk&client_id=${BACKGROUND_API.key}`;
