import React, { useState } from 'react';
import Screen from './components/screen';

function App() {
  const [render, forceRerender] = useState(true);
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null
      ? undefined
      : localStorage.getItem('userToken').split(','),
  );

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
