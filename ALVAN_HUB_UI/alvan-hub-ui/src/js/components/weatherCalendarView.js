import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import serviceFactory from "../utils/service-factory";
import { Watch } from "react-loader-spinner";

function WeatherCalendarView(props) {
  const { trigger, defaultWeather, setDefaultWeather } = props;
  const [response, setResponse] = useState(defaultWeather);
  const dayName = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  if (Math.floor(new Date().getTime()/1000) - response?.location?.localtime_epoch >= 600 || response === '') {
    serviceFactory.weatherRequest('philadelphia', setResponse);
    console.log(trigger);
  }

  useEffect(() => setDefaultWeather(response), [response, setDefaultWeather]);

  const slot2Icon = response?.forecast?.forecastday[0].day.condition.icon;
  const slot3Icon = response?.forecast?.forecastday[1].day.condition.icon;
  const slot4Icon = response?.forecast?.forecastday[2].day.condition.icon;

  return (
    <>

      <div className={"calendar-weather-view weather-1"}>
        <h2>Today</h2>
        {
          response?.current?.condition?.icon ?
          <img className="centered weather-icon" src={slot2Icon} alt="" draggable="false" /> :
          <Watch color="#5A6060"/>
        }
      </div>
      <div className={"calendar-weather-view weather-2"}>
        <h2>Tomorrow</h2>
        {
          response?.current?.condition?.icon ?
          <img className="centered weather-icon" src={slot3Icon} alt="" draggable="false" /> :
          <Watch color="#5A6060"/>
        }
      </div>
      <div className={"calendar-weather-view weather-3"}>
        <h2>{dayName[(new Date().getDay() + 2) % 7]}</h2>
        {
          response?.current?.condition?.icon ?
          <img className="centered weather-icon" src={slot4Icon} alt="" draggable="false" /> :
          <Watch className="centered"  color="#5A6060"/>
        }
      </div>
      <div className={"calendar-weather-view weather-4"}>
        <h2>Current</h2>
        {
          response?.current?.condition?.icon ?
          <img className="centered weather-icon" src={response?.current?.condition?.icon} alt="" draggable="false" /> :
          <Watch color="#5A6060"/>
        }
        {
          response?.current?.condition &&
          (<div id='current-data'>
            <h3>{response.current.condition.text}</h3>
            <h3>Temp: {response.current.temp_f}°F</h3>
            <h3>Feels Like: {response.current.feelslike_f}°F</h3>
            <h3>Wind Speed: {response.current.wind_mph} mph</h3>
          </div>)
        }
      </div>
    </>
  );
}

WeatherCalendarView.defaultProps = {
  trigger: false,
  defaultWeather: '',
}

WeatherCalendarView.propTypes = {
  trigger: PropTypes.bool,
  defaultWeather: PropTypes.oneOf(PropTypes.string, PropTypes.object),
}

export default WeatherCalendarView;