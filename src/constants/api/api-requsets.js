import {
  userLocationUrl,
  geoLocationUrl,
  geoWeatherUrl,
  forecastUrl,
  translateUrl,
  backgroundUrl,
} from '../api/api-urls';
import { regex, forecastRegex, errData } from '../app-constants';
import placeholder from '../../assets/images/background.jpg';

export const getUserLocation = async (
  setLoading,
  setQuery,
  setErr,
  setWeatherData,
  setSourceLoaded,
  lang,
) => {
  try {
    setLoading(true);
    const rawResp = await fetch(userLocationUrl);
    const resp = await rawResp.json();
    const { city, country } = resp;
    const locationName = `${city} ${country}`;
    geoLocation(
      locationName,
      setLoading,
      setQuery,
      setErr,
      setWeatherData,
      setSourceLoaded,
      lang,
    );
  }
  catch {
    setLoading(false);
    const err = { ...errData };
    err.open = true;
    err.message = 'Rate limit exceeded';
    setErr(err);
  }
}

export const geoLocation = async (
  location,
  setLoading,
  setQuery,
  setErr,
  setWeatherData,
  setSourceLoaded,
  lang,
) => {
  try {
    setLoading(true);
    const rawResp = await fetch(geoLocationUrl(location));
    const resp = await rawResp.json();
    const { results: [
      {
        formatted,
        geometry: { lat, lng },
      }
    ]
    } = resp;
    const locationName = formatted.replace(regex, ',');
    const weatherData = {
      location: locationName,
      geometry: { lat, lng },
    }
    getWeatherData(
      setLoading,
      setQuery,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
    );
  }
  catch {
    setLoading(false);
    setQuery('');
    const err = { ...errData };
    err.open = true;
    err.message = 'city was not found';
    setErr(err);
  }
}

export const getWeatherData = async (
  setLoading,
  setQuery,
  setErr,
  weatherData,
  setWeatherData,
  setSourceLoaded,
  lang,
) => {
  const { geometry: { lat, lng } } = weatherData;
  try {
    const rawResp = await fetch(geoWeatherUrl(lat, lng));
    const resp = await rawResp.json();
    const {
      main: {
        temp,
        feels_like,
        humidity,
      },
      weather: [{ description, icon, id }],
      wind: {
        speed,
      },
      timezone,
    } = resp;

    weatherData.temp = temp;
    weatherData.feelsLike = feels_like;
    weatherData.cod = id;
    weatherData.humidity = humidity;
    weatherData.speed = speed;
    weatherData.timezone = timezone;
    weatherData.icon = icon;

    setQuery('');
    getForecast(
      setLoading,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
      description,
    );
  }
  catch {
    setLoading(false);
    const err = { ...errData };
    err.open = true;
    err.message = 'invalid API key or weather info is unavailable';
    setErr(err);
  }
}

export const getForecast = async (
  setLoading,
  setErr,
  weatherData,
  setWeatherData,
  setSourceLoaded,
  lang,
  description,
) => {
  const { geometry: { lat, lng } } = weatherData;
  try {
    const rawResp = await fetch(forecastUrl(lat, lng));
    const resp = await rawResp.json();
    const forecastList = resp.list.filter(({ dt_txt }) => forecastRegex.test(dt_txt));
    const forecastValues = [];
    forecastList.forEach(
      ({ main: {temp_max, temp_min} }) => forecastValues.push(((temp_max + temp_min) / 2))
    );
    weatherData.forecast = forecastList;
    weatherData.forecastTemps = forecastValues;
    getBackImage(
      setLoading,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
      description,
    );
  }
  catch {
    setLoading(false);
    const err = { ...errData };
    err.open = true;
    err.message = 'invalid API key or weather info is unavailable';
    setErr(err);
  }
}

export const translateApiData = async (
  weatherData,
  setWeatherData,
  lang,
  setErr,
  setLang,
  langObj,
) => {
  const { location } = weatherData;
  try {
    const rawResp = await fetch(translateUrl(location, lang));
    const resp = await rawResp.json();
    const { text } = resp;
    const [translate] = text;
    const newData = { ...weatherData };
    newData.location = translate;
    setWeatherData(newData);
    setLang && setLang(langObj);
  }
  catch {
    const err = { ...errData };
    err.open = true;
    err.message = 'translate services is unavailable';
    setErr(err);
  }
}

const LazyBackgroundLoader = (
  src,
  setLoading,
  setErr,
  weatherData,
  setWeatherData,
  setSourceLoaded,
  lang,
) => {
  const img = new Image();
  img.src = src;
  img.onload = async () => {
    resolveAllData(
      setLoading,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
    );
  };
  img.onerror = () => {
    setLoading(false);
  }
}

export const getBackImage = async (
  setLoading,
  setErr,
  weatherData,
  setWeatherData,
  setSourceLoaded,
  lang,
  description,
) => {
  setLoading(true);
  try {
    const { location } = weatherData;
    const rawResp = await fetch(backgroundUrl(location, description));
    const resp = await rawResp.json();
    const { urls: { regular } } = resp;
    weatherData.imageSrc = regular;
    LazyBackgroundLoader(
      regular,
      setLoading,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
    );
  }
  catch {
    const err = { ...errData };
    err.open = true;
    err.message = 'images limit 50/hour is exceeded';
    setErr(err);
    LazyBackgroundLoader(
      placeholder,
      setLoading,
      setErr,
      weatherData,
      setWeatherData,
      setSourceLoaded,
      lang,
    );
  }
}

const resolveAllData = (
  setLoading,
  setErr,
  weatherData,
  setWeatherData,
  setSourceLoaded,
  lang,
) => {
  const { imageSrc } = weatherData;
  lang && translateApiData(weatherData, setWeatherData, lang, setErr);
  setSourceLoaded(imageSrc);
  setWeatherData(weatherData);
  setLoading(false);
}
