import Screen from './components/screen';
import React, { useState, useEffect } from 'react';
import getConstants from './utils/constants';

function App() {
  const [render, forceRerender] = useState(true);
  const CONSTANTS = getConstants();
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null ? undefined : localStorage.getItem('userToken').split(','));



  return (
    <Screen
      render={render}
      forceRerender={forceRerender}
      userToken={userToken}
      setUserToken={setUserToken}
    />
  );
}

export default App;
