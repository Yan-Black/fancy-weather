import React from 'react';
import { cloudy } from '../assets/images/animated/cloudy.svg';
import { cloudyDayOne } from '../assets/images/animated/cloudy.svg';
import { cloudyNightOne } from '../assets/images/animated/cloudy.svg';
import { day } from '../assets/images/animated/cloudy.svg';
import { night } from '../assets/images/animated/cloudy.svg';
import { rainyThree } from '../assets/images/animated/cloudy.svg';
import { rainyFive } from '../assets/images/animated/cloudy.svg';
import { rainySix } from '../assets/images/animated/cloudy.svg';
import { snowySix } from '../assets/images/animated/cloudy.svg';
import { thunder } from '../assets/images/animated/cloudy.svg';

export const weatherConditionsIcons = new Map();
weatherConditionsIcons.set('01d', day);
weatherConditionsIcons.set('02d', cloudyDayOne);
weatherConditionsIcons.set('03d', cloudy);
weatherConditionsIcons.set('04d', cloudy);
weatherConditionsIcons.set('09d', rainyFive);
weatherConditionsIcons.set('10d', rainyThree);
weatherConditionsIcons.set('11d', thunder);
weatherConditionsIcons.set('13d', snowySix);
weatherConditionsIcons.set('50d', cloudy);
weatherConditionsIcons.set('01n', night);
weatherConditionsIcons.set('02n', cloudy);
weatherConditionsIcons.set('03n', cloudy);
weatherConditionsIcons.set('04n', cloudyNightOne);
weatherConditionsIcons.set('09n', rainyFive);
weatherConditionsIcons.set('10n', rainySix);
weatherConditionsIcons.set('11n', thunder);
weatherConditionsIcons.set('13n', snowySix);
weatherConditionsIcons.set('50n', cloudy);


