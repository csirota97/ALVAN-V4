import React, { useEffect, useState } from "react";
import serviceFactory from "../utils/service-factory";
import { Watch } from  'react-loader-spinner'
import PropTypes from 'prop-types';

function WeatherContainer (props) {
  const { trigger, defaultWeather, setDefaultWeather } = props;
  const [response, setResponse] = useState(defaultWeather);

  if (Math.floor(new Date().getTime()/1000) - response?.location?.localtime_epoch >= 600 || response === '') {
    serviceFactory.weatherRequest(null, setResponse);
  }

  useEffect(() => setDefaultWeather(response), [response, setDefaultWeather])
  
  return (
    <div className={'nonselectable'}>
      <div className={'weather-description'}>
        {response?.current?.condition?.text}
      </div>
      <br/>
      <div className={'weather-temp'}>
        {`${response?.current?.temp_f}°F`}
      </div>
      <br/>
      {
        response?.current?.condition?.icon ?
        <img src={response?.current?.condition?.icon} alt="" draggable="false" /> :
        <Watch color="#5A6060"/>
      }
    </div>
  );
}

WeatherContainer.defaultProps = {
  trigger: false,
  defaultWeather: '',
}

WeatherContainer.propTypes = {
  trigger: PropTypes.bool,
  defaultWeather: PropTypes.oneOf(PropTypes.string, PropTypes.object),
}

export default WeatherContainer;