import React, { useEffect, useState } from 'react';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer.js';
import PropTypes from 'prop-types';
import HomeView from './views/homeView';
import CalendarView from './views/calendarView';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const [displayCalendar, setDisplayCalendar] = useState(!props.home && true);
  const [defaultWeather, setDefaultWeather] = useState('');
  const customProps = {
    defaultWeather: defaultWeather,
    setDefaultWeather: setDefaultWeather
  }
  const homeView = (<HomeView {...props} {...customProps} />);
  const calendarView = (<CalendarView {...props} {...customProps} />);

  return (
    <div className="screen-container">
      <Clock />
      <img className='logo' alt="logo" src={logo}></img>
      <img className='logo-back' alt="logo back" src={logo2}></img>
      <SpeechRecognizer></SpeechRecognizer>
      <div className='view-swap-button' onClick={() => setDisplayCalendar(!displayCalendar)}>
        <h3 className='view-swap-label nonselectable'>
          { displayCalendar ? 'Show Home View' : 'Show Calendar View'}
        </h3>
      </div>
      { displayCalendar ? calendarView : homeView }
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
