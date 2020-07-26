import React from 'react';
import './css/Location.css';

const LocationBlock = ({ locationName }) => (
  <div className="location-block">
    <h1 className="city-country">
      <span className="city">
        {locationName}
      </span>
    </h1>
  </div>
);

export default LocationBlock;
