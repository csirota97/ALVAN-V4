import React, { useState, useEffect } from 'react';
import Card from './card';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer.js';
import mockCalendarCall from '../utils/mockCalendarCalls.js'
import PropTypes from 'prop-types';
import WeatherContainer from './weatherContainer';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const [calendarState, setCalendarState] = useState(props.calendarData.items);

  const [weatherQueryTrigger, setWeatherQueryTrigger] = useState(true);
  
  const weatherButtonClick = () => {
    setWeatherQueryTrigger(!weatherQueryTrigger);
  }


  const weatherComponent = (
    <Card name="Current Weather" lockedWidth={"150px"} className={'weather-card'}><WeatherContainer trigger={weatherQueryTrigger} /></Card>
  );

  const [calendarCardOrder, setCalendarCardOrder] = useState({});
  const [render, forceRerender] = useState(true);

  useEffect(() => {
    const order = {};
    calendarState.forEach((event, i) => order[i] = 50 - (calendarState.length - 1) + i)

    setCalendarCardOrder(order)
  }, [calendarState]);

  const hasCalendarCardBeenClicked = (id) => {
    const order = calendarCardOrder;
    const currentClickedValue = order[id];
    calendarState.forEach((event, i) => {
      if (order[i] > currentClickedValue) {
        order[i] = order[i] - 1
      }
    });
    order[id] = 50;
    setCalendarCardOrder(order);
    forceRerender(!render);
  };

  const calendarEvents = calendarState.map((event, i) =>
    <Card
      name={event.summary.substring(0, 30)}
      lockedWidth="default"
      posY={i*50 + 1}
      key={`${i}${event.summary}`}
      zIndex={calendarCardOrder}
      id={i}
      render={render}
      hasBeenClicked={hasCalendarCardBeenClicked}
      className={'calendar-card'}
    >
      {event.organizer.displayName}
      <hr />
      {event.start.date}
      <br />
      {event.end.date}
    </Card>
  );

  return (
    <div className="screen-container">
      <Clock />
      {calendarEvents}

      <button onClick={() => setCalendarState(mockCalendarCall.items)} >show calendar events</button>
      <img className='logo' src={logo}></img>
      <img className='logo-back' src={logo2}></img>
      <SpeechRecognizer></SpeechRecognizer>
      {weatherComponent}
      <button onClick={weatherButtonClick} >trigger weather</button>
    </ div>
  );
};

Screen.propTypes = {
  /**
   * Calendar event data from query
   */
  calendarData: PropTypes.object,
}

Screen.defaultProps = {
  calendarData: {items: []}
}

export default Screen;
