
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

  const findLocalKey = (listOfLists, localObject) => {
    console.log(listOfLists.filter(list => list.key === localObject.key)[0])
    return listOfLists.filter(list => list.key === localObject.key)[0]
  }

  let defaultSelectedList = undefined;
  if(constructedToDoLists) {
    console.log(constructedToDoLists[0], 'bazingaroni')
    defaultSelectedList = constructedToDoLists[0];
    const currentLocalSelection = JSON.parse(localStorage.getItem('currentListSelection'));
    const localKey = findLocalKey(constructedToDoLists, currentLocalSelection)
    console.log(111)
    if (currentLocalSelection && localKey) {
      console.log(222, localKey)
      defaultSelectedList = localKey
    } else {
    console.log(333)

      localStorage.setItem('currentListSelection', JSON.stringify(constructedToDoLists[0]))
    }
  }

  return (
    (lists && constructedToDoLists || !userToken) &&
    <Screen
      toDoLists={constructedToDoLists}
      defaultSelection={defaultSelectedList}
      triggerListsReconstruction={() => setReconstructTrigger(true)}
      userToken={userToken}
      setUserToken={setUserToken}
      unloaded={!lists || !constructedToDoLists}
    />
  );
}

export default App;
