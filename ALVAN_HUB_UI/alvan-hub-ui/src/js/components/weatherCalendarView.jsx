import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Watch } from 'react-loader-spinner';
import serviceFactory from '../utils/service-factory';

function WeatherCalendarView(props) {
  const { defaultWeather, setDefaultWeather } = props;
  const [response, setResponse] = useState(defaultWeather);
  const dayName = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  if ((
    response?.location?.localtime_epoch
    && Math.floor(new Date().getTime() / 1000) - response.location.localtime_epoch >= 600)
    || response === ''
  ) {
    serviceFactory.weatherRequest(null, setResponse);
  }

  useEffect(() => setDefaultWeather(response), [response, setDefaultWeather]);

  const slot2Icon = response?.forecast?.forecastday[0].day.condition.icon;
  const slot3Icon = response?.forecast?.forecastday[1].day.condition.icon;
  const slot4Icon = response?.forecast?.forecastday[2].day.condition.icon;

  const slotWeatherInfo = (slotIcon, slotIndex) => (
    <div className="centered">
      <img className="weather-icon" src={slotIcon} alt="" draggable="false" />
      <div className="inline-text">
        <h3 className="max-temp">{`Max: ${response?.forecast?.forecastday[slotIndex].day.maxtemp_f}°F`}</h3>
        <h3 className="min-temp">{`Min: ${response?.forecast?.forecastday[slotIndex].day.mintemp_f}°F`}</h3>
      </div>
    </div>
  );

  return (
    <>

      <div className="calendar-weather-view weather-1">
        <h2>Today</h2>
        {
          response?.current?.condition?.icon
            ? slotWeatherInfo(slot2Icon, 0)
            : <Watch color="#5A6060" />
        }
      </div>
      <div className="calendar-weather-view weather-2">
        <h2>Tomorrow</h2>
        {
          response?.current?.condition?.icon
            ? slotWeatherInfo(slot3Icon, 1)
            : <Watch color="#5A6060" />
        }
      </div>
      <div className="calendar-weather-view weather-3">
        <h2>{dayName[(new Date().getDay() + 2) % 7]}</h2>
        {
          response?.current?.condition?.icon
            ? slotWeatherInfo(slot4Icon, 2)
            : <Watch className="centered" color="#5A6060" />
        }
      </div>
      <div className="calendar-weather-view weather-4">
        <h2>Current</h2>
        {
          response?.current?.condition?.icon
            ? <img className="weather-icon" src={response?.current?.condition?.icon} alt="" draggable="false" />
            : <Watch color="#5A6060" />
        }
        {
          response?.current?.condition
          && (
            <div id="current-data">
              <h3>{response.current.condition.text}</h3>
              <h3>
                Temp:
                {response.current.temp_f}
                °F
              </h3>
              <h3>
                Feels Like:
                {response.current.feelslike_f}
                °F
              </h3>
              <h3>
                Wind Speed:
                {response.current.wind_mph}
                {' '}
                mph
              </h3>
            </div>
          )
        }
      </div>
    </>
  );
}

WeatherCalendarView.defaultProps = {
  defaultWeather: '',
};

WeatherCalendarView.propTypes = {
  defaultWeather: PropTypes.oneOf(PropTypes.string, PropTypes.object),
};

export default WeatherCalendarView;
