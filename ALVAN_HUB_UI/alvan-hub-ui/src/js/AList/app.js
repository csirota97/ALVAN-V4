
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
    if (!lists && !constructedToDoLists) {
      // console.log(2,2)
      serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.GET_LIST_EVENTS, null, setLists);
    }
    else if (lists && !constructedToDoLists) {
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
    lists && constructedToDoLists &&
    <Screen toDoLists={constructedToDoLists} defaultSelection={constructedToDoLists[0]} triggerListsReconstruction={() => setReconstructTrigger(true)}>
    </Screen>
  );
}

export default App;
