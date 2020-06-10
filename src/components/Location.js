import React from 'react';
import './css/Location.css';

function LocationBlock(props) {
	return (
		<div className="location-block">
			<h1 className="city-country"><span className="city">{props.city}</span>, <span className="country">{props.country}</span></h1>
		</div>
	);
}

export default LocationBlock;
