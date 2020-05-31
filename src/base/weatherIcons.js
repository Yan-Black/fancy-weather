import React from 'react';
import cloudy from '../assets/images/animated/cloudy.svg';
import cloudyDayOne from '../assets/images/animated/cloudy-day-1.svg';
import cloudyNightOne from '../assets/images/animated/cloudy-night-1.svg';
import day from '../assets/images/animated/day.svg';
import night from '../assets/images/animated/night.svg';
import rainyThree from '../assets/images/animated/rainy-3.svg';
import rainyFive from '../assets/images/animated/rainy-5.svg';
import rainySix from '../assets/images/animated/rainy-6.svg';
import snowySix from '../assets/images/animated/snowy-6.svg';
import thunder from '../assets/images/animated/thunder.svg';

export const weatherConditionsIcons = {
    '01d': day,
    '02d': cloudyDayOne,
    '03d': cloudy,
    '04d': cloudy,
    '09d': rainyFive,
    '10d': rainyThree,
    '11d': thunder,
    '13d': snowySix,
    '50d': cloudy,
    '01n': night,
    '02n': cloudy,
    '03n': cloudy,
    '04n': cloudyNightOne,
    '09n': rainyFive,
    '10n': rainySix,
    '11n': thunder,
    '13n': snowySix,
    '50n': cloudy
}
    