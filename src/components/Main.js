import React from 'react';
import LocationBlock from './Location';
import WeatherBlock from './Weather';
import ForecastBlock from './Forecast';
import MapBlock from './Map';
import Clock from './Clock';
import RegionDate from './Date';

const Main = ({
	weather: {
		timezone,
		weather,
		main: {
			temp,
			feels_like,
			humidity
		},
		wind: {
			speed
		}
	},
	city, country, weatherDescription, forecast, lat, lng,
}) => {
	const regexp = /12:00:00/;
	const forecastList = forecast.list.filter(obj => regexp.test(obj.dt_txt));

	return (
		<div>
			<div className="weather-section">
				<div className="weather-block">
					<div className="weather-header">
						<div className="location">
							<LocationBlock city={city.replace('City', '')} country={country} />
							<RegionDate timeZone={timezone} />
						</div>
						<Clock timeZone={timezone} />
					</div>
					<WeatherBlock
						cod={weather[0].id}
						temp={temp}
						src={weather[0].icon}
						desc={
							[
								weatherDescription,
								feels_like,
								humidity,
								speed
							]
						}
					/>
					<ForecastBlock
						temp={forecastList.map(({ main }) => main.temp)}
						src={forecastList.map(({ weather: [{ icon }] }) => icon)}
					/>
				</div>
				<MapBlock lng={lng} lat={lat} />
			</div>
		</div>
	)
}

export default Main;
