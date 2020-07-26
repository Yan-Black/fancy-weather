import React from 'react';
import LocationBlock from './Location';
import WeatherBlock from './Weather';
import ForecastBlock from './Forecast';
import MapBlock from './Map';
import Clock from './Clock';
import RegionDate from './Date';

const Main = ({
  lang,
	weather: {
		timezone,
    weather: [{ icon }],
    main: {
      humidity,
    },
		wind: {
			speed
		}
  },
  mainTemp,
  forecastTemp,
  locationName,
  weatherDescription,
  forecast, lat, lng,
}) => {

  const [temp, feelsLike] = mainTemp;

	return (
		<div>
			<div className="weather-section">
				<div className="weather-block">
					<div className="weather-header">
						<div className="location">
							<LocationBlock locationName={locationName} />
							<RegionDate timeZone={timezone} lang={lang} />
						</div>
						<Clock timeZone={timezone} />
					</div>
					<WeatherBlock
						temp={temp}
						src={icon}
            desc={[
              weatherDescription,
              feelsLike,
              humidity,
              speed,
            ]}
            lang={lang}
					/>
					<ForecastBlock
            temp={forecast.map(({ main }) => main.temp)}
            forecastTemp={forecastTemp}
            src={forecast.map(({ weather: [{ icon }] }) => icon)}
            lang={lang}
					/>
				</div>
				<MapBlock lng={lng} lat={lat} lang={lang} />
			</div>
		</div>
	)
}

export default Main;
