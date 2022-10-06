
import React, { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import getConstants from '../utils/constants';
import Screen from './listScreen';
import './app.scss';

function App() {
  const [render, forceRerender] = useState(true);
  const CONSTANTS = getConstants();

  return (
    <Screen>
    </Screen>
  );
}

export default App;
