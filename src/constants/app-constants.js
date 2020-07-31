const { appUnits } = localStorage;

export const farenheit = 'imperial';
export const celsius = 'metric';
export const defaultUnits = appUnits || celsius;
export const regex = /,.*?,/;
export const forecastRegex = /12:00:00/;
export const convertToImperial = (val) => val * 9 / 5 + 32;
export const convertToMetric = (val) => (val - 32) / 1.8;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = new SpeechRecognition();
export const phrase = new SpeechSynthesisUtterance();
export const synth = window.speechSynthesis;
export const ruForecast = (
  temp, weatherDescription, feelsLike, humidity, speed,
) => `Сегодня ${Math.round(temp)}°, ${weatherDescription}, ощущается как ${Math.floor(feelsLike)}°, влажность ${humidity}%, скорость ветра ${speed} метров в секунду`;
export const enForecast = (
  temp, weatherDescription, feelsLike, humidity, speed,
) =>`Today is ${Math.round(temp)}°, ${weatherDescription}, feels like ${Math.floor(feelsLike)}°, humidity is ${humidity}%, wind speed is  ${speed} meters in a second`;

export const errData = {
  open: false,
  message: '',
};
