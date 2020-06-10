import React from 'react';
import LocationBlock from './Location';
import WeatherBlock from './Weather';
import ForecastBlock from './Forecast';
import MapBlock from './Map';
import Clock from './Clock';
import RegionDate from './Date';

function Main({ weather,city, country, weatherDescription, forecast, lat, lng }) {
	const regexp = /12:00:00/;
	const forecastList = forecast.list.filter(obj => regexp.test(obj.dt_txt));

	return (
		<div>
			<div className="weather-section">
				<div className="weather-block">
					<div className="weather-header">
						<div className="location">
							<LocationBlock city={city.replace('City', '')} country={country} />
							<RegionDate timeZone={weather.timezone} />
						</div>
						<Clock timeZone={weather.timezone} />
					</div>
					<WeatherBlock
						cod={weather.weather[0].id}
						temp={weather.main.temp}
						src={weather.weather[0].icon}
						desc={
							[
								weatherDescription,
								weather.main.feels_like,
								weather.main.humidity,
								weather.wind.speed
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
