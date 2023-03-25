
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getConstants from '../utils/constants';
import Screen from './listScreen';
import './app.scss';
import serviceFactory from '../utils/service-factory';
import constructToDoLists from '../utils/constructToDoLists';

function App() {
  const [lists, setLists] = useState(null);
  const [remindersList, setRemindersList] = useState(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);
  const [constructedToDoLists, setConstructedToDoLists] = useState(null);
  const [reconstructTrigger, setReconstructTrigger] = useState(false);
  const CONSTANTS = getConstants();
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userToken') === 'undefined' || localStorage.getItem('userToken') == null
      ? undefined
      : localStorage.getItem('userToken').split(','),
  );
  const { token } = useParams();

  useEffect(() => {
    if (!!token && !!userToken && !isDeviceRegistered) {
      serviceFactory.registerToDoDevice(userToken[0], token);
      setIsDeviceRegistered(true);
    }
  }, [token, userToken, isDeviceRegistered]);

  useEffect(() => {
    if (reconstructTrigger) {
      setReconstructTrigger(false);
      setLists(null);
      setConstructedToDoLists(null);
    }
  }, [reconstructTrigger]);

  useEffect(() => {
    if (!lists && !constructedToDoLists && userToken) {
      serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.GET_LIST_EVENTS, { id: userToken[0] }, setLists);
      serviceFactory.getRemindersRequest(userToken[0], setRemindersList);
    } else if (lists && !constructedToDoLists && userToken) {
      setConstructedToDoLists(constructToDoLists(lists));
    }
  }, [lists, constructedToDoLists, userToken, CONSTANTS.TODO_REQUEST.GET_LIST_EVENTS]);

  const findLocalKey = (listOfLists, localObject) => {
    if (!localObject || !localObject.key) return undefined;
    return listOfLists.filter(list => list.key === localObject.key)[0];
  };

  let defaultSelectedList;
  if (constructedToDoLists) {
    [defaultSelectedList] = constructedToDoLists;
    const currentListSelection = sessionStorage.getItem('currentListSelection');
    const currentLocalSelection = JSON.parse(
      currentListSelection === 'undefined' ? JSON.stringify({}) : currentListSelection,
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
    currentActivePageStore === 'undefined' ? JSON.stringify({}) : currentActivePageStore,
  );

  return (
    ((lists && constructedToDoLists) || !userToken)
    && (
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
    )
  );
}

export default App;
