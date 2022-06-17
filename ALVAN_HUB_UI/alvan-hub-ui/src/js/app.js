import Screen from './components/screen';
import React, {useState} from 'react';

function App() {
  const [render, forceRerender] = useState(true);
  return (<Screen render={render} forceRerender={forceRerender}/>);
}

export default App;
