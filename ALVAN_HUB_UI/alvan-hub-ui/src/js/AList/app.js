
import React, { useState, useEffect } from 'react';
import getConstants from '../utils/constants';
import Screen from './listScreen';
import './app.scss';
import serviceFactory from '../utils/service-factory';
import constructToDoLists from '../utils/constructToDoLists';

function App() {
  const [render, forceRerender] = useState(true);
  const [lists, setLists] = useState(null);
  const [constructedToDoLists, setConstructedToDoLists] = useState(null);
  const [reconstructTrigger, setReconstructTrigger] = useState(false);
  const CONSTANTS = getConstants();
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null ? undefined : localStorage.getItem('userToken').split(','));

  useEffect(() => {
    if (reconstructTrigger) {
      // console.log("kill")
      setReconstructTrigger(false);
      setLists(null);
      setConstructedToDoLists(null);
      // console.log("restart")
    }
  })

  useEffect(() => {
    // console.log(1,1)
    if (!lists && !constructedToDoLists && userToken) {
      // console.log(2,2)
      console.log(userToken);
      serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.GET_LIST_EVENTS, {id: userToken[0]}, setLists);
    }
    else if (lists && !constructedToDoLists && userToken) {
      // console.log(3,3)
      // console.log(lists)

      setConstructedToDoLists(constructToDoLists(lists))
    } else {
    // console.log(4,4)

      // console.log(constructedToDoLists);
    }
  })

  if(constructedToDoLists)
  console.log(constructedToDoLists[0])

  return (
    (lists && constructedToDoLists || !userToken) &&
    <Screen
      toDoLists={constructedToDoLists}
      defaultSelection={constructedToDoLists ? constructedToDoLists[0] : undefined}
      triggerListsReconstruction={() => setReconstructTrigger(true)}
      userToken={userToken}
      setUserToken={setUserToken}
      unloaded={!lists || !constructedToDoLists}
    />
  );
}

export default App;
