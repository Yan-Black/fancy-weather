import React from 'react';
import './css/Location.css';

function LocationBlock(props) {
    return (
        <div className="location-block">
            <h1 className="city-country">{props.city}, {props.country}</h1>
        </div>
    );
}

export default LocationBlock;