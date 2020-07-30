import React from 'react';
import LocationBlock from './Location';
import WeatherBlock from './Weather';
import ForecastBlock from './Forecast';
import MapBlock from './Map';
import Clock from './Clock';
import RegionDate from './Date';

const Main = () => (
  <div>
    <div className="weather-section">
      <div className="weather-block">
        <div className="weather-header">
          <div className="location">
            <LocationBlock />
            <RegionDate />
          </div>
          <Clock />
        </div>
        <WeatherBlock />
        <ForecastBlock />
      </div>
      <MapBlock />
    </div>
  </div>
)

export default Main;
