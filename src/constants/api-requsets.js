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
  setErrorMessage,
  setOpenErrorModal,
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
      setErrorMessage,
      setOpenErrorModal,
      locationName,
      setters,
      lang,
    );
  }
  catch {
    setLoading(false);
    setOpenErrorModal(true);
    setErrorMessage('Rate limit exceeded');
  }
}

export const geoLocation = async (
  setLoading,
  setQuery,
  setLocationName,
  setWeatherDesc,
  setErrorMessage,
  setOpenErrorModal,
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
      setErrorMessage,
      setOpenErrorModal,
    );
  }
  catch {
    setLoading(false);
    setErrorMessage('city was not found');
    setQuery('');
    setOpenErrorModal(true);
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
  setErrorMessage,
  setOpenErrorModal,
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
      setErrorMessage,
      setOpenErrorModal,
    );
  }
  catch {
    setLoading(false);
    setOpenErrorModal(true);
    setErrorMessage('invalid API key or weather info is unavailable');
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
  setErrorMessage,
  setOpenErrorModal,
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
      setErrorMessage,
      setOpenErrorModal,
    );
  }
  catch {
    setLoading(false);
    setOpenErrorModal(true);
    setErrorMessage('invalid API key or weather info is unavailable');
  }
}

export const translateApiData = async (
  data,
  setPropTranslate,
  lang,
  setErrorMessage,
  setOpenErrorModal,
) => {
  try {
    const rawResp = await fetch(translateUrl(data, lang));
    const resp = await rawResp.json();
    const { text } = resp;
    const [translate] = text;
    setPropTranslate(translate);
  }
  catch {
    setErrorMessage('translate services is unavailable');
    setOpenErrorModal(true);
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
  setErrorMessage,
  setOpenErrorModal,
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
        setErrorMessage,
        setOpenErrorModal,
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
  setErrorMessage,
  setOpenErrorModal,
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
      setErrorMessage,
      setOpenErrorModal,
    );
  }
  catch {
    setErrorMessage('images limit 50/hour is exceeded');
    setOpenErrorModal(true);
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
      setErrorMessage,
      setOpenErrorModal,
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
  setErrorMessage,
  setOpenErrorModal,
) => {
  translateApiData(
    locationName,
    setLocationName,
    lang,
    setErrorMessage,
    setOpenErrorModal,
  );
  translateApiData(
    description,
    setWeatherDesc,
    lang,
    setErrorMessage,
    setOpenErrorModal,
  );
  setters.forEach((setter, i) => setter(dataToResolve[i]));
  setLoading(false);
}
