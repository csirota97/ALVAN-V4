import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import Clock from './clock';
import SpeechRecognizer from './speechRecognizer';
import HomeView from './views/homeView';
import CalendarView from './views/calendarView';
import Card from './card';
import Logo from './logo';
import ActionCard from './actionCard';
import NewUserDialog from './Cards/newUserDialog';
import LogInDialog from './Cards/logInDialog';
import serviceFactory from '../utils/service-factory';
import hashStringToInt from '../utils/hashStringToInt';

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
  const [hideSpeechRecognizer, setHideSpeechRecognizer] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [cameraIPState, setCameraIPState] = useState([]);
  const [rerenderReminders, setRerenderReminders] = useState(false);
  const cameraToggleIndex = {};

  // TODO: GET HOME VALUE FROM DB ON STARTUP
  const homeId = 2121;

  let cameraIPs = JSON.parse(sessionStorage.getItem('cameraIPs'));
  if (cameraIPs === null) {
    sessionStorage.setItem('cameraIPs', JSON.stringify([]));
    cameraIPs = [];
  }

  const pushToCameraIPs = (ip) => {
    cameraIPs = JSON.parse(sessionStorage.getItem('cameraIPs'));
    if (!cameraIPs.includes(ip)) {
      cameraIPs.push(ip);
      sessionStorage.setItem('cameraIPs', JSON.stringify(cameraIPs));
      setCameraIPState(cameraIPs);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (initialRender) {
      sessionStorage.setItem('cameraIPs', JSON.stringify([]));
      setHideSpeechRecognizer(true);
      const tempCameraIPs = [];
      const pushToTemp = (ip) => tempCameraIPs.push(ip);
      const loop = async () => {
        for (let i = 1; i < 256; i++) {
          const call = serviceFactory.securityCameraNetworkScan(i, homeId);
          pushToTemp(call);
        }
      };
      await loop();
      Promise.allSettled(tempCameraIPs).then((results) => results.forEach(async (result) => {
        if (result.status === 'fulfilled') {
          if (result.value.status === 200) {
            pushToCameraIPs(result.value.url);
          } else if (result.value.status === 401) {
            const regCall = await serviceFactory.setSecurityCameraRegistration(result.value.url, homeId);
            if (regCall.status === 200) {
              pushToCameraIPs(result.value.url);
              serviceFactory.registerDevice(homeId, hashStringToInt(result.value.deviceId), 1);
            }
          }
        }
      }));
      setInitialRender(false);
    }
  });

  const customProps = {
    defaultWeather,
    setDefaultWeather,
    render: props.render,
    forceRerender: props.forceRerender,
    calendarData,
    setCalendarData,
    userToken: props.userToken,
  };

  const homeView = (
    <HomeView
      securityCameraIPs={cameraIPState}
      securityCameraToggleIndex={cameraToggleIndex}
      {...customProps}
    />
  );
  const calendarView = (<CalendarView {...customProps} updateRemindersToggle={rerenderReminders} />);
  const revalidate = () => setValidationTrigger(!validationTrigger);
  const toggleMenuCard = () => {
    if (isMenuShown) {
      setSettingsCardClasses('settings-wrapper settings-closing');
      setTimeout(() => setIsMenuShown(false), 500);
    } else {
      setIsMenuShown(true);
      setSettingsCardClasses('settings-wrapper settings-opening');
    }
  };

  const newUserCard = (isNewUserCardShown && (
    <ActionCard
      name="Register"
      confirmAction={revalidate}
      confirmText="Register"
      cancelAction={() => { setIsNewUserCardShown(false); }}
      cancelText="Cancel"
    >
      <NewUserDialog
        userInfo={newUserCriteria}
        setUserInfo={setNewUserCriteria}
        onSubmit={(token) => { setIsNewUserCardShown(false); props.setUserToken(token); }}
        validationTrigger={validationTrigger}
      />
    </ActionCard>
  ));

  const loginCard = (isLogInCardShown && (
    <ActionCard
      name="Sign In"
      confirmAction={revalidate}
      confirmText="Sign In"
      cancelAction={() => { setIsLogInCardShown(false); }}
      cancelText="Cancel"
    >
      <LogInDialog
        userInfo={logInUserCriteria}
        setUserInfo={setLogInUserCriteria}
        onSubmit={(token) => { setIsLogInCardShown(false); props.setUserToken(token); }}
        validationTrigger={validationTrigger}
      />
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
            props.userToken
              ? (
                <>
                  Welcome Back,
                  {' '}
                  {props.userToken[1]}
                  !
                  <br />
                  <div
                    className="close-button secondary button"
                    onClick={() => {
                      localStorage.setItem('userToken', undefined);
                      props.setUserToken(null);
                      window.location.reload();
                      toggleMenuCard();
                    }}
                  >
                    Sign Out
                  </div>
                </>
              )
              : (
                <>
                  <div
                    className="close-button secondary button"
                    onClick={() => {
                      setIsMenuShown(false);
                      setIsLogInCardShown(true);
                      setLogInUserCriteria(defaultNewUser);
                      toggleMenuCard();
                    }}
                  >
                    Sign In
                  </div>
                  <br />
                  <div
                    className="close-button secondary button"
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
              )
          }
          {
            props.userToken
              ? (
                <>
                  <br />
                  <div
                    className="close-button secondary button"
                    onClick={() => {
                      setHideSpeechRecognizer(!hideSpeechRecognizer);
                    }}
                  >
                    {hideSpeechRecognizer ? 'Show Speech Recognizer' : 'Hide Speech Recognizer'}
                  </div>
                </>
              ) : undefined
          }
        </div>
      </Card>
    </div>
  );

  const callbackFunctions = {
    rerenderReminders: () => setRerenderReminders(!rerenderReminders),
  };

  return (
    <div className="screen-container">
      {/* <Clock /> */}
      <Logo toggleMenuCard={toggleMenuCard} />
      {settingsCard}
      {newUserCard}
      {loginCard}
      {props.userToken
        ? (
          <>
            <Card
              name="Speech Recognizer"
              lockedWidth="400px"
              posY={100}
              id={-2}
              zIndex={{ '-2': hideSpeechRecognizer ? -1000 : 1000 }}
              className={hideSpeechRecognizer ? 'hidden' : ''}
              hasBeenClicked={() => {}}
            >
              <SpeechRecognizer userId={props.userToken[0]} callbackFunctions={callbackFunctions} />
            </Card>
            <div className="view-swap-button" onClick={() => setDisplayCalendar(!displayCalendar)}>
              <h3 className="view-swap-label nonselectable">
                { displayCalendar ? 'Show Home View' : 'Show Calendar View'}
              </h3>
            </div>
            { displayCalendar ? calendarView : homeView }
          </>
        )
        : (
          <span id="please-sign-in">
            Tap the logo in the
            <br />
            corner to get started
          </span>
        )}
    </div>
  );
}

Screen.propTypes = {
  /**
   * Calendar event data from query
   */
  calendarData: PropTypes.object,
};

Screen.defaultProps = {
};

export default Screen;
