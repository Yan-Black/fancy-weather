const { appUnits } = localStorage;

export const farenheit = 'imperial';
export const celsius = 'metric';
export const defaultUnits = appUnits || celsius;
export const regex = /,.*?,/;
export const forecastRegex = /12:00:00/;
export const convertToImperial = (val) => val * 9 / 5 + 32;
export const convertToMetric = (val) => (val - 32) / 1.8;
