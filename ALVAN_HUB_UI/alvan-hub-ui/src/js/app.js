import Screen from './components/screen';
import React, { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import getConstants from './utils/constants';

function App() {
  const [render, forceRerender] = useState(true);
  const CONSTANTS = getConstants();
  
  const existingUser = JSON.parse(localStorage.getItem('googleUser'))
  const [googleUser, setGoogleUser] = useState(existingUser?.tokenObj.expires_at > new Date().getTime() ? existingUser : null);

  useEffect(() => {
    localStorage.setItem('googleUser', JSON.stringify(googleUser));
  })

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: CONSTANTS.CLIENT_ID,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });

  return (
    <Screen
      render={render}
      forceRerender={forceRerender}
      googleUser={googleUser}
      setGoogleUser={setGoogleUser}
    />
  );
}

export default App;
