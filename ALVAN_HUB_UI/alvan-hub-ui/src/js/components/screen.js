import React, { useState } from 'react';
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer.js';
import PropTypes from 'prop-types';
import HomeView from './views/homeView';
import CalendarView from './views/calendarView';
import Card from './card';
import GoogleSignInButton from './googleSignInButton';
import Logo from './logo';
import ActionCard from './actionCard';
import NewUserDialog from './Cards/newUserDialog';
import LogInDialog from './Cards/logInDialog';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const defaultNewUser = {
    firstNameValid: true,
    lastNameValid: true,
    emailValid: true,
    passwordValid: true,
    confirmPasswordValid: true,
  };
  const [displayCalendar, setDisplayCalendar] = useState(!props.home && true);
  const [defaultWeather, setDefaultWeather] = useState('');
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isLogInCardShown, setIsLogInCardShown] = useState(false);
  const [isNewUserCardShown, setIsNewUserCardShown] = useState(false);
  const [newUserCriteria, setNewUserCriteria] = useState(defaultNewUser);
  const [logInUserCriteria, setLogInUserCriteria] = useState(defaultNewUser);
  const [calendarData, setCalendarData] = useState([]);
  const [validationTrigger, setValidationTrigger] = useState(true);
  const [settingsCardClasses, setSettingsCardClasses] = useState('settings-wrapper settings-closing');
  
  const customProps = {
    defaultWeather: defaultWeather,
    setDefaultWeather: setDefaultWeather,
    render: props.render,
    forceRerender: props.forceRerender,
    calendarData: calendarData,
    setCalendarData: setCalendarData
  }
  
  const homeView = (<HomeView {...customProps} />);
  const calendarView = (<CalendarView {...customProps} />);
  const revalidate = () => setValidationTrigger(!validationTrigger);
  const toggleMenuCard = () => {
    if (isMenuShown) {
      setSettingsCardClasses('settings-wrapper settings-closing')
      setTimeout(() => setIsMenuShown(false), 500);
    } else {
      setIsMenuShown(true)
      setSettingsCardClasses('settings-wrapper settings-opening');
    }
  };

  const newUserCard = (isNewUserCardShown && (
    <ActionCard

      confirmAction={() => {revalidate()}}
      confirmText={"Add User"}
      cancelAction={() => {setIsNewUserCardShown(false)}}
      cancelText={"Cancel"}
    >
      <NewUserDialog userInfo={newUserCriteria} setUserInfo={setNewUserCriteria} onSubmit={(token) => {setIsNewUserCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
    </ActionCard>
  ));

  const loginCard = (isLogInCardShown && (
      <ActionCard

        confirmAction={() => {revalidate()}}
        confirmText={"Log In"}
        cancelAction={() => {setIsLogInCardShown(false)}}
        cancelText={"Cancel"}
      >
        <LogInDialog userInfo={logInUserCriteria} setUserInfo={setLogInUserCriteria} onSubmit={(token) => {setIsLogInCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
      </ActionCard>
    )
  );

  const settingsCard = (
    <div className={settingsCardClasses}>
      <Card
        name="Settings"
        className="front"
        lockedPos
        lockedWidth="250px"
        id={-1}
        zIndex={{ '-1': 200000 }}
        posY={-75}
      >
        <div>
          {
            props.userToken ? 
            <>
            Welcome Back, {props.userToken[1]}!
              <div
                className='close-button secondary button' 
                onClick={() => {
                  localStorage.setItem('userToken', undefined);
                  props.setUserToken(null);
                  window.location.reload();
                  toggleMenuCard(); 
                }}
                >
                  Log Out
              </div>
            </> :
            <>
              <div
                className='close-button secondary button' 
                onClick={() => {
                  setIsMenuShown(false);
                  setIsLogInCardShown(true);
                  setLogInUserCriteria(defaultNewUser);
                  toggleMenuCard(); 
                }}
                >
                  Log In
              </div><br />
              <div
                className='close-button secondary button' 
                onClick={() => {
                  setIsMenuShown(false);
                  setIsNewUserCardShown(true);
                  setNewUserCriteria(defaultNewUser);
                  toggleMenuCard(); 
                }}
                >
                  New User
              </div>
            </>
          }
        </div>
      </Card>
    </div>
  );

  return (
    <div className="screen-container">
      <Clock />
      <Logo toggleMenuCard={toggleMenuCard} />
      {settingsCard}
      {newUserCard}
      {loginCard}
      <Card name="Speech Recognizer" lockedWidth="400px" posY={300} id={-2} zIndex={{'-2': 1000}}>
        <SpeechRecognizer/>
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
}

export default Screen;
