import React, { useContext } from 'react';
import { appContext } from '../../App';
import './index.css';

const LocationBlock = () => {
  const { payload: [,,, { location }] } = useContext(appContext);
  return (
    <div className="location-block">
      <h1 className="city-country">
        <span className="city">
          {location}
        </span>
      </h1>
    </div>
  );
};
export default LocationBlock;
