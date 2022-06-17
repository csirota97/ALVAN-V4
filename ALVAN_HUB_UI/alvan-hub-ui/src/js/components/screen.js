import React, { useState, useEffect } from 'react';
import Card from './card';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer.js';
import mockCalendarCall from '../utils/mockCalendarCalls.js'
import PropTypes from 'prop-types';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const [calendarState, setCalendarState] = useState(props.calendarData.items);
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

  const createCalendarCards = () => {
    return calendarState.map((event, i) => {
      return <Card
          name={event.summary.substring(0, 30)}
          lockedWidth="default"
          posY={i*50 + 1}
          key={`${i}${event.summary}`}
          zIndex={calendarCardOrder}
          id={i}
          render={render}
          hasBeenClicked={hasCalendarCardBeenClicked}
        >
          {event.organizer.displayName}
          <hr />
          {event.start.date}
          <br />
          {event.end.date}
        </Card>;
      }
    )
  };

  return (
    <div className="screen-container">
      <Clock />
      {createCalendarCards()}

      <button onClick={() => setCalendarState(mockCalendarCall.items)} />
      <img className='logo' src={logo} alt="logo"></img>
      <img className='logo-back' src={logo2} alt="logo2"></img>
      <SpeechRecognizer></SpeechRecognizer>
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
