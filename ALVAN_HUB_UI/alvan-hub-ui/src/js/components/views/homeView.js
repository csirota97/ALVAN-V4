import React, { useState, useEffect } from 'react';
import Card from '../card';
import WeatherContainer from '../weatherCardContainer';

import mockCalendarCall from '../../utils/mockCalendarCalls';
import getConstants from '../../utils/constants';

function HomeView(props) {
  const [calendarState, setCalendarState] = useState(props.calendarData.items);

  const [weatherQueryTrigger, setWeatherQueryTrigger] = useState(true);
  const constants = getConstants();
  
  const weatherButtonClick = () => {
    setWeatherQueryTrigger(!weatherQueryTrigger);
  }

  const weatherComponent = (
    <Card
      id={constants.WEATHER_ID}
      name="Current Weather"
      lockedWidth="150px"
      className="weather-card"
    >
      <WeatherContainer trigger={weatherQueryTrigger} defaultWeather={props.defaultWeather} setDefaultWeather={props.setDefaultWeather} />
    </Card>
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
    <div>
      {calendarEvents}
      <button onClick={() => setCalendarState(mockCalendarCall.items)} id='show-calendar-events' >show calendar events</button>
      {weatherComponent}
      <Card name="last" lockedPos />
      <button onClick={weatherButtonClick} >trigger weather</button>
    </div>
  )
}

export default HomeView;