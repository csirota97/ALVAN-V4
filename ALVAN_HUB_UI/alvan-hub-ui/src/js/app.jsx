import React, { useState } from 'react';
import Screen from './components/screen';

function App() {
  const [render, forceRerender] = useState(true);
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null
      ? undefined
      : localStorage.getItem('userToken').split(','),
  );
  const [timerToggle, setTimerToggle] = useState(false);

  setInterval(() => {
    setTimerToggle(!timerToggle);
  }, 600000);

  return (
    <Screen
      render={render}
      forceRerender={forceRerender}
      userToken={userToken}
      setUserToken={setUserToken}
      tenMinuteTimer={timerToggle}
    />
  );
}

export default App;
