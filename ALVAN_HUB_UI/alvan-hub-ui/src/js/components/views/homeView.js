import React, { useState, useEffect } from 'react';
import Card from '../card';
import WeatherContainer from '../weatherCardContainer';

import mockCalendarCall from '../../utils/mockCalendarCalls';
import getConstants from '../../utils/constants';
import serviceFactory from '../../utils/service-factory';

function HomeView(props) {
  const [calendarState, setCalendarState] = useState([]);

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
      name={event.description.substring(0, 30)}
      lockedWidth="default"
      posY={i*50 + 1}
      key={`${i}${event.summary}`}
      zIndex={calendarCardOrder}
      id={i}
      render={render}
      hasBeenClicked={hasCalendarCardBeenClicked}
      className={'calendar-card'}
    >
      {event.organizer || "Organizer"}
      <hr />
      {event.startDateTime}
      <br />
      {event.endDateTime}
      <br />
      {event.status}
    </Card>
  );

  const [calendars, setCalendars] = useState([]);
  const [retry, setRetry] = useState(0);
  const [events, setEvents] = useState([]);
  const [searchForEvents, triggerSearchForEvents] = useState(false);
  let tempEvents = events;
  const appendEvents = (newEvents) => {
    tempEvents = tempEvents.concat(newEvents);
    setEvents(tempEvents)
  }

  const getCalendarData = () => {
    setEvents([])
    serviceFactory.calendarRequest(1, setCalendars);
    triggerSearchForEvents(true)
  }

  useEffect(() => {
    if (calendars.length > 0 && !searchForEvents && events.length === 0) {
      triggerSearchForEvents(true);
    }

    if (searchForEvents) {
      calendars.forEach(calendar => {
        serviceFactory.eventRequest(calendar.id, appendEvents)
      });
      triggerSearchForEvents(false);
    }
  });

  useEffect(() => {
    setCalendarState(events)
    props.setCalendarData(events)
  })

  return (
    <div>
      {calendarEvents}
      <button onClick={getCalendarData} id='show-calendar-events' >show calendar events</button>
      {/* <button onClick={() => setCalendarState(mockCalendarCall.items)} id='show-calendar-events' >show calendar events</button> */}
      {weatherComponent}
      <Card name="last" lockedPos />
      <button onClick={weatherButtonClick} >trigger weather</button>
    </div>
  )
}

export default HomeView;