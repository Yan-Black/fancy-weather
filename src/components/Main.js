import React from 'react';
import LocationBlock from './Location';
import WeatherBlock from './Weather';
import ForecastBlock from './Forecast';
import MapBlock from './Map';
import Clock from './Clock';
import RegionDate from './Date';

function Main(props) {
  const regexp = /12:00:00/;
  const forecastList = props.forecast.list.filter(obj => regexp.test(obj.dt_txt));
 
    return (
            <div>
              <div className="weather-section">
                <div className="weather-block">
                  <div className="weather-header">
                    <div className="location">
                        <LocationBlock city={props.city.replace('City', '')} country={props.country} />
                          <RegionDate timeZone={props.weather.timezone} />
                    </div>
                      <Clock timeZone={props.weather.timezone} />
                  </div>
                    <WeatherBlock 
                    cod={props.weather.weather[0].id}
                    temp={props.weather.main.temp}
                    src={props.weather.weather[0].icon}
                    desc={
                      [
                        props.weatherDescription,
                        props.weather.main.feels_like,
                        props.weather.main.humidity,
                        props.weather.wind.speed
                      ]
                    }
                  />
                    <ForecastBlock 
                      temp={
                        [
                          forecastList[0].main.temp,
                          forecastList[1].main.temp,
                          forecastList[2].main.temp,
                          forecastList[3].main.temp,
                          forecastList[4].main.temp
                        ]
                      }
                      src={
                        [
                          forecastList[0].weather[0].icon,
                          forecastList[1].weather[0].icon,
                          forecastList[2].weather[0].icon,
                          forecastList[3].weather[0].icon,
                          forecastList[4].weather[0].icon
                        ]
                      }
                    />
                </div>
                  <MapBlock lng={props.lng} lat={props.lat} setLon={props.setLon} setLat={props.setLat} name={props.weather.name}/>
              </div>
            </div>
    )
}

export default Main;