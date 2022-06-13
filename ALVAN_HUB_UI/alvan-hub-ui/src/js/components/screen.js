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

  return (
    <div className="screen-container">
      <Clock />
      {calendarState.map((event, i) =>
        <Card name={event.summary.substring(0, 30)} lockedWidth="default" posY={i*50 + 1} key={`${i}${event.summary}`} >
          {event.organizer.displayName}
          <hr />
          {event.start.date}
          <br />
          {event.end.date}
        </Card>
      )}

      <button onClick={() => setCalendarState(mockCalendarCall.items)} />
      <img className='logo' src={logo}></img>
      <img className='logo-back' src={logo2}></img>
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
