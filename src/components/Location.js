import React from 'react';
import './css/Location.css';

const LocationBlock = ({ city,country }) => {
	return (
		<div className="location-block">
			<h1 className="city-country">
				<span className="city">
					{city}
				</span>
				{','}
				<span className="country">
					{country}
				</span>
			</h1>
		</div>
	);
}

export default LocationBlock;
