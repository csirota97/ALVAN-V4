
import React, { useState, useEffect } from 'react';
import getConstants from '../utils/constants';
import Screen from './listScreen';
import './app.scss';
import serviceFactory from '../utils/service-factory';
import constructToDoLists from '../utils/constructToDoLists';
import { useParams } from 'react-router-dom';

function App() {
  const [render, forceRerender] = useState(true);
  const [lists, setLists] = useState(null);
  const [remindersList, setRemindersList] = useState(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false)
  const [constructedToDoLists, setConstructedToDoLists] = useState(null);
  const [reconstructTrigger, setReconstructTrigger] = useState(false);
  const CONSTANTS = getConstants();
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null ? undefined : localStorage.getItem('userToken').split(','));
  let { token } = useParams();

  useEffect(()=>{
    if (!!token && !!userToken && !isDeviceRegistered) {
      serviceFactory.registerToDoDevice(userToken[0], token);
      setIsDeviceRegistered(true);
    }
    console.log(token)
  })

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
      serviceFactory.getRemindersRequest(userToken[0], setRemindersList)
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
    if (!localObject || !localObject.key) return undefined;
    console.log(listOfLists.filter(list => list.key === localObject.key)[0])
    return listOfLists.filter(list => list.key === localObject.key)[0]
  }

  let defaultSelectedList = undefined;
  if(constructedToDoLists) {
    console.log(constructedToDoLists[0], 'bazingaroni')
    defaultSelectedList = constructedToDoLists[0];
    const currentListSelection = sessionStorage.getItem('currentListSelection');
    const currentLocalSelection = JSON.parse(
      currentListSelection === 'undefined' ? JSON.stringify({}) : currentListSelection
    );
    const localKey = findLocalKey(constructedToDoLists, currentLocalSelection);
    if (currentLocalSelection && localKey) {
      defaultSelectedList = localKey;
    } else {
      sessionStorage.setItem('currentListSelection', JSON.stringify(constructedToDoLists[0]));
    }
  }

  const currentActivePageStore = sessionStorage.getItem('currentActivePage');
  const currentActivePage = JSON.parse(
    currentActivePageStore === 'undefined' ? JSON.stringify({}) : currentActivePageStore
  );

  return (
    (lists && constructedToDoLists || !userToken) &&
    <Screen
      toDoLists={constructedToDoLists}
      remindersList={remindersList}
      defaultSelection={defaultSelectedList}
      triggerListsReconstruction={() => setReconstructTrigger(true)}
      userToken={userToken}
      setUserToken={setUserToken}
      unloaded={!lists || !constructedToDoLists}
      remindersScreenActive={currentActivePage === 'reminders'}
    />
  );
}

export default App;
