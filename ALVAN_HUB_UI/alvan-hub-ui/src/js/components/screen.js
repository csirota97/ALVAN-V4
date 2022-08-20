import React, { useState } from 'react';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer.js';
import PropTypes from 'prop-types';
import HomeView from './views/homeView';
import CalendarView from './views/calendarView';
import Card from './card';
import GoogleSignInButton from './googleSignInButton';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const [displayCalendar, setDisplayCalendar] = useState(!props.home && true);
  const [defaultWeather, setDefaultWeather] = useState('');
  const [isMenuShown, setIsMenuShown] = useState(false)
  const customProps = {
    defaultWeather: defaultWeather,
    setDefaultWeather: setDefaultWeather,
    render: props.render,
    forceRerender: props.forceRerender,
    calendarData: props.calendarData
  }
  const homeView = (<HomeView {...customProps} />);
  const calendarView = (<CalendarView {...customProps} />);
  const toggleMenuCard = () => setIsMenuShown(!isMenuShown);

  return (
    <div className="screen-container">
      <Clock />
      <div onClick={toggleMenuCard} onTouchTap={toggleMenuCard}>
        <img className='logo' alt="logo" src={logo}></img>
        <img className='logo-back' alt="logo back" src={logo2}></img>  
      </div>
      {isMenuShown && (
          <Card name="Settings" className="front" lockedPos lockedWidth="400px" id={-1} zIndex={{ '-1': 2000 }} posX={window.innerWidth - 410} posY={-50}>
            <div>
            <GoogleSignInButton setGoogleUser={props.setGoogleUser} googleUser={props.googleUser}/>
            </div>
          </Card>
        )}
      <Card name="Speech Recognizer" lockedWidth="400px">
        <SpeechRecognizer></SpeechRecognizer>
      </Card>
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
