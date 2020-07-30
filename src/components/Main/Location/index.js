import React, { useContext } from 'react';
import { appContext } from '../../../App';
import './index.css';

const LocationBlock = () => {
  const { payload: [,,,locationName] } = useContext(appContext);
  return (
    <div className="location-block">
      <h1 className="city-country">
        <span className="city">
          {locationName}
        </span>
      </h1>
    </div>
  );
};
export default LocationBlock;
