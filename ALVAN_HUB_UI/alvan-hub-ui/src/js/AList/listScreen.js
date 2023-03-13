import React, { useEffect, useState } from 'react';
import Clock from '../components/clock';
import Card from '../components/card';
import Logo from '../components/logo';
import Selector from '../components/dropdownSelector';
import mockToDoLists from '../utils/mockToDoLists';
import serviceFactory from '../utils/service-factory';
import getConstants from '../utils/constants';
import { reconstructToDoLists } from '../utils/constructToDoLists';
import ActionCard from '../components/actionCard';
import NewUserDialog from '../components/Cards/newUserDialog';
import LogInDialog from '../components/Cards/logInDialog';
import TaskRow from './taskRow';
import ListBody from './listBody';
import ReminderListBody from './reminderListBody';
import ButtonGroup from 'terra-button-group';

const CONSTANTS = getConstants();

/**
 * @return {Component} screen component
 */
function Screen(props) {
  console.log(props)
  const defaultNewUser = {
    firstNameValid: true,
    lastNameValid: true,
    emailValid: true,
    passwordValid: true,
    confirmPasswordValid: true,
  };
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isNewTaskDialogShown, setIsNewTaskDialogShown] = useState(false);
  const [isNewListDialogShown, setIsNewListDialogShown] = useState(false);
  const [isLogInCardShown, setIsLogInCardShown] = useState(false);
  const [isNewUserCardShown, setIsNewUserCardShown] = useState(false);
  const [isTaskSettingsCardShown, setIsTaskSettingsCardShown] = useState(false);
  const [isListSettingsCardShown, setIsListSettingsCardShown] = useState(false);
  const [isDeleteTaskCardShown, setIsDeleteTaskCardShown] = useState(false);
  const [isDeleteListCardShown, setIsDeleteListCardShown] = useState(false);
  const [isEventRepeating, setIsEventRepeating] = useState(false);
  const [isAllDayReminder,setIsAllDayReminder] = useState(false);
  const [eventRepeatUnit, setEventRepeatUnit] = useState(["0"]);
  const [eventRepeatInterval, setEventRepeatInterval] = useState(1);
  const today = new Date();
  const [eventRepeatStartDate, setEventRepeatStartDate] = useState(`${today.getFullYear()}-${today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate()}`);
  const [reminderDate, setReminderDate] = useState(`${today.getFullYear()}-${today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate()}`);
  const [reminderTime, setReminderTime] = useState("08:00");
  const [listOptions, setListOptions] = useState(props.toDoLists);
  const [selectedListOption, setSelectedListOption] = useState(props.defaultSelection);
  const [newTaskName, setNewTaskName] = useState('');
  const [newListName, setNewListName] = useState('');
  const [newReminderName, setNewReminderName] = useState('');
  const [showNewTaskErrorText, setShowNewTaskErrorText] = useState(false);
  const [showNewListErrorText, setShowNewListErrorText] = useState(false);
  const [showNewReminderErrorText, setShowNewReminderErrorText] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [reload, setReload] = useState(0);
  const [newUserCriteria, setNewUserCriteria] = useState(defaultNewUser);
  const [logInUserCriteria, setLogInUserCriteria] = useState(defaultNewUser);
  const [validationTrigger, setValidationTrigger] = useState(true);
  const [settingsCardClasses, setSettingsCardClasses] = useState('settings-wrapper settings-closing');
  const [activeTask, setActiveTask] = useState(null);
  const [isTodoListShown, setIsTodoListShown] = useState(true);
  const triggerReload = () => setReload(reload+1);
  const revalidate = () => setValidationTrigger(!validationTrigger);
  const toggleMenuCard = () => {
    console.log(2222222)
    if (isMenuShown) {
      setSettingsCardClasses('settings-wrapper settings-closing')
      setTimeout(() => setIsMenuShown(false), 500);
    } else {
      setIsMenuShown(true)
      setSettingsCardClasses('settings-wrapper settings-opening');
    }
  };

  const onListSelectorChange = (newList) => {
    console.log(newList)
    localStorage.setItem('currentListSelection', JSON.stringify(newList))
    return setSelectedListOption(newList)
  }
  
  const openNewTaskDialog = () => {setIsNewTaskDialogShown(true); setIsEventRepeating(false);}
  const openNewListDialog = () => setIsNewListDialogShown(true);
  
  const updateTask = (task) => {
    console.log(task)
    console.log(`Make call to flip task: ${task.id}:'${task.description}' to ${!task.completed}`)
    console.log(task.completed)
    serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.UPDATE_EVENT,{eventId: task.id, completed: !task.completed},()=>console.log(`${task.id}:'${task.description}' set to ${!task.completed}`))
    const listOptionsCopy = listOptions.slice().map(listOption => {
      if (listOption.key === selectedListOption?.key) {
        listOption.tasks = listOption.tasks.map(optionTask => {
          if (optionTask.id === task.id) {
            optionTask.completed = !optionTask.completed;
            optionTask.inProgress = false;
          }
          return optionTask;
        });
      }
      return listOption;
    })
    setListOptions(listOptionsCopy)
  };

  const onNewTaskConfirmButtonClick = () => {
    if (isTodoListShown) {
      if(newTaskName) {
        serviceFactory.toDoRequest(
          CONSTANTS.TODO_REQUEST.NEW_EVENT,
          {
            listId: selectedListOption.key,
            description: newTaskName,
            repeatUnit: isEventRepeating ? eventRepeatUnit[0] : -1,
            repeatInterval: isEventRepeating ? eventRepeatInterval : null,
            repeatStartDate: isEventRepeating ? eventRepeatStartDate : null,
          },
          (res) => console.log(res)
        );
        // setListOptions(reconstructToDoLists());
        window.location.reload();
        // props.triggerListsReconstruction();
        setIsNewTaskDialogShown(false);
      } else {
        setShowNewTaskErrorText(true);
      }
      setNewTaskName('');
    } else {
      if(newReminderName) {
        let amPm = '';
        if (parseInt(reminderTime.split(':')[0]) < 12 || (parseInt(reminderTime.split(':')[0]) === 12  && parseInt(reminderTime.split(':')[1]) === 0)) {
          amPm = 'am';
        }
        const amPmReminderTime = isAllDayReminder ? '08:00 am' : `${reminderTime} ${amPm}`;
        serviceFactory.newReminderRequest(props.userToken[0], newReminderName, `Set a reminder for ${amPmReminderTime} on ${reminderDate}`)
        window.location.reload();
        setIsNewTaskDialogShown(false);
      } else {
        setShowNewReminderErrorText(true);
      }
      console.log({newReminderName, reminderTime, reminderDate})
    }
  };
  const onNewTaskCancelButtonClick = () => {
    setIsNewTaskDialogShown(false);
    setNewTaskName('');
  }
  const newTaskConfirmText = "Create Task";
  const newTaskCancelText = "Cancel";

  const onNewListConfirmButtonClick = () => {
    if(newListName) {
      serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.NEW_LIST, {
        ownerId: props.userToken[0],
        calendarId: null,
        listName: newListName,
      }, (res) => console.log(res));
      // setListOptions(reconstructToDoLists());
      window.location.reload();
      // props.triggerListsReconstruction();
      setIsNewListDialogShown(false);
    } else {
      setShowNewListErrorText(true);
    }
    setNewListName('');
  };
  const onNewListCancelButtonClick = () => {
    setIsNewListDialogShown(false);
    setNewListName('');
  }
  const newListConfirmText = "Create List";
  const newListCancelText = "Cancel";

  const onListSettingsButtonClick = () => {
    console.log(selectedListOption)
    setIsListSettingsCardShown(true);
  };

  const newUserCard = (isNewUserCardShown && (
    <ActionCard

      confirmAction={() => {revalidate()}}
      confirmText={"Add User"}
      cancelAction={() => {setIsNewUserCardShown(false)}}
      cancelText={"Cancel"}
    >
      <NewUserDialog userInfo={newUserCriteria} setUserInfo={setNewUserCriteria} onSubmit={(token) => {setIsNewUserCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
    </ActionCard>
  ));

  const loginCard = (isLogInCardShown && (
      <ActionCard

        confirmAction={() => {revalidate()}}
        confirmText={"Sign In"}
        cancelAction={() => {setIsLogInCardShown(false)}}
        cancelText={"Cancel"}
      >
        <LogInDialog userInfo={logInUserCriteria} setUserInfo={setLogInUserCriteria} onSubmit={(token) => {setIsLogInCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
      </ActionCard>
    )
  );

  useEffect(()=>{console.log(activeTask)})


  const onEventRepeatSelectorChange = (event, selectedKey) => {
    if (ButtonGroup.Utils.shouldHandleSingleSelection(eventRepeatUnit, selectedKey)) {
      event.preventDefault();
      setEventRepeatUnit([selectedKey])
    }
  }

  const newTaskCard = (isNewTaskDialogShown && (isTodoListShown ? (
    <ActionCard
      confirmAction={onNewTaskConfirmButtonClick}
      confirmText={newTaskConfirmText}
      cancelAction={onNewTaskCancelButtonClick}
      cancelText={newTaskCancelText}
      name="New Task"
    >
      <label for="newTask">New Task</label><br/>
      <input 
        type="text" 
        id="newTask" 
        name="newTask" 
        onChange={(event) =>{
          if (showNewTaskErrorText) {
            setShowNewTaskErrorText(false)
          }
          setNewTaskName(event.target.value);
        }}/><br/>
        {showNewTaskErrorText && <div className='error-text'>A Name Must Be Entered To Create A New Task</div>}

        <br />
        <label>
          <input
            type="checkbox"
            checked={isEventRepeating}
            onChange={(e) => {console.log(e); setIsEventRepeating(!isEventRepeating)}}
          />
          Repeat Event
        </label>
  
        {isEventRepeating && (
          <>
            <br />
            <br />
            <ButtonGroup
              id="repeat-unit-selector"
              onChange={onEventRepeatSelectorChange}
              
              selectedKeys={eventRepeatUnit}
            >
              <ButtonGroup.Button text="Days" key={0} />
              <ButtonGroup.Button text="Weeks" key={1} />
              <ButtonGroup.Button text="Monthly" key={2} />
            </ButtonGroup>
            <br />
            <br />

            {
              !eventRepeatUnit.includes('2') &&
              (
                <>
                  <label>
                    Repeat Interval
                    <br />
                    <input
                      type="number"
                      value={eventRepeatInterval}
                      onChange={(e) => {console.log(e); setEventRepeatInterval(e.target.value);}}
                    />
                  </label>
                  <br />
                  <br />
                </>
              )
            }
            <label>
              Repeat Start Date
              <br />
              <input type="date"
                id="repeat-start-date"
                name="trip-start"
                min="2018-01-01"
                value={eventRepeatStartDate}
                onChange={(e) => setEventRepeatStartDate(e.target.value)}
              />
            </label>
          </>
        )}
      </ActionCard>
    ) : 
    (
      <ActionCard
      confirmAction={onNewTaskConfirmButtonClick}
      confirmText={newTaskConfirmText}
      cancelAction={onNewTaskCancelButtonClick}
      cancelText={newTaskCancelText}
      name="New Reminder"
    >
      <label for="newReminder">New Reminder</label><br/>
      <input 
        type="text" 
        id="newReminder" 
        name="newReminder" 
        onChange={(event) =>{
          if (showNewReminderErrorText) {
            setShowNewReminderErrorText(false)
          }
          setNewReminderName(event.target.value);
        }}/><br/>
        {showNewReminderErrorText && <div className='error-text'>A Name Must Be Entered To Create A New Reminder</div>}


        <br />
        <label>
          {"All Day Reminder "}
        </label>
        <input
          type="checkbox"
          checked={isAllDayReminder}
          onChange={(e) => {console.log(e); setIsAllDayReminder(!isAllDayReminder)}}
        />
        {
          !isAllDayReminder ? 
          <>
            <br />
            <br />
            <label for="reminderTime">Reminder Time</label>
            <br />
            <input 
              type="time"
              id="reminderTime" 
              name="reminderTime" 
              min="00:00" 
              max="23:59" 
              required
              value={reminderTime}
              onChange={(e) => {console.log(e); setReminderTime(e.target.value)}}
            />
          </>:<></>
        }
        <br />
        <br />
        <label>
          Repeat Start Date
        </label>
        <br />
        <input type="date"
          id="repeat-start-date"
          name="trip-start"
          min="2018-01-01"
          value={reminderDate}
          onChange={(e) => {console.log(e.target);setReminderDate(e.target.value)}}
        />
      </ActionCard> 
    ))
  );

  const newListCard = (isNewListDialogShown && (
    <ActionCard
      confirmAction={onNewListConfirmButtonClick}
      confirmText={newListConfirmText}
      cancelAction={onNewListCancelButtonClick}
      cancelText={newListCancelText}
      name="New List"
    >
      <label for="newList">New List</label><br/>
      <input 
        type="text" 
        id="newList" 
        name="newList" 
        onChange={(event) =>{
          if (showNewListErrorText) {
            setShowNewListErrorText(false)
          }
          setNewListName(event.target.value);
        }}
      />
      <br/>
      {showNewListErrorText && <div className='error-text'>A Name Must Be Entered To Create A New List</div>}
    </ActionCard>
  ));

  const settingsCard = (
    <div className={settingsCardClasses}>
      <Card
        name="Settings"
        className="front"
        lockedPos
        lockedWidth="250px"
        id={-1}
        zIndex={{ '-1': 200000 }}
        posY={-75}
      >
        <div>
          {
            props.userToken ? 
            <>
            Welcome Back, {props.userToken[1]}!
              <br/>
              <div
                className='close-button secondary button' 
                onClick={() => {
                  localStorage.setItem('userToken', undefined);
                  props.setUserToken(null);
                  window.location.reload();
                  toggleMenuCard(); 
                }}
                >
                  Sign Out
              </div>
            </> :
            <>
              <div
                className='close-button secondary button' 
                onClick={() => {
                  setIsMenuShown(false);
                  setIsLogInCardShown(true);
                  setLogInUserCriteria(defaultNewUser);
                  toggleMenuCard(); 
                }}
                >
                  Sign In
              </div><br />
              <div
                className='close-button secondary button' 
                onClick={() => {
                  setIsMenuShown(false);
                  setIsNewUserCardShown(true);
                  setNewUserCriteria(defaultNewUser);
                  toggleMenuCard(); 
                }}
                >
                  New User
              </div>
            </>
          }
          <br />
          <div
            className='close-button secondary button' 
            onClick={() => {
              console.log("List type swap button");
              setIsTodoListShown(!isTodoListShown);
              toggleMenuCard(); 
            }}
            >
              {isTodoListShown ? "Show Reminders" : "Show To-Do Lists"}
          </div>
        </div>
      </Card>
    </div>
  );

  const closeTaskSettings = "Close";
  const taskSettingsCard = (
    isTaskSettingsCardShown &&
    <ActionCard
      cancelAction={() => setIsTaskSettingsCardShown(false)}
      cancelText={closeTaskSettings}
      name={activeTask?.description}
    >
      <div
        className='create-button secondary button'
        onClick={() => {
          serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.EVENT_SET_IN_PROGRESS,{eventId: activeTask.id, completed: activeTask.completed, inProgress: true},()=>console.log(`${activeTask.id}:'${activeTask.description}' set to in progress`));
          const listOptionsCopy = listOptions.slice().map(listOption => {
            if (listOption.key === selectedListOption?.key) {
              listOption.tasks = listOption.tasks.map(optionTask => {
                if (optionTask.id === activeTask.id) {
                  optionTask.completed = false;
                  optionTask.inProgress = true;
                }
                return optionTask;
              });
            }
            return listOption;
          })
          setListOptions(listOptionsCopy);
          setIsTaskSettingsCardShown(false);
        }}
        >
        In Progress
      </div>
      <br />
      <div
        className='create-button secondary button'
        onClick={() => {setIsTaskSettingsCardShown(false); setIsDeleteTaskCardShown(true);}}
        >
        Delete Task
      </div>
      <br/>
    </ActionCard>
  );

  const deleteTaskCard = (
    isDeleteTaskCardShown &&
    <ActionCard
      confirmAction={() => {
        serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.DELETE_EVENT,{eventId: activeTask.id},()=>console.log(`task deleted`));
        setIsDeleteTaskCardShown(false);
        window.location.reload();
      }}
      confirmText="Delete Task"
      cancelAction={() => {setIsDeleteTaskCardShown(false); setIsTaskSettingsCardShown(true);}}
      cancelText="Cancel"
      name="Delete Task?"
    >
      Would you like to delete {activeTask.description}?
      <br/>
    </ActionCard>
  );
  const listSettingsCard = (
    isListSettingsCardShown &&
    <ActionCard
      cancelAction={() => setIsListSettingsCardShown(false)}
      cancelText={closeTaskSettings}
      name={selectedListOption.value}
    >
      <div
        className='create-button secondary button'
        onClick={() => {setIsListSettingsCardShown(false); openNewListDialog(true);}}
      >
        Add List
      </div>
      <br/>
      <div
        className='create-button secondary button'
        onClick={() => {setIsListSettingsCardShown(false); setIsDeleteListCardShown(true);}}
      >
        Delete List
      </div>
      <br/>
    </ActionCard>
  );

  const deleteListCard = (
    isDeleteListCardShown &&
    <ActionCard
      confirmAction={() => {
        serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.DELETE_LIST,{listId: selectedListOption.key},()=>console.log(`list deleted`));
        setIsDeleteListCardShown(false);
        window.location.reload();
      }}
      confirmText="Delete List"
      cancelAction={() => {setIsDeleteListCardShown(false); setIsListSettingsCardShown(true);}}
      cancelText="Cancel"
      name="Delete List?"
    >
      Would you like to delete {selectedListOption.value}?
      <br/>
    </ActionCard>
  );

  return (
    <div className="screen-container">
      <Clock />
      <Logo toggleMenuCard={toggleMenuCard} />
      {settingsCard}
      {newUserCard}
      {loginCard}
      {newTaskCard}
      {newListCard}
      {taskSettingsCard}
      {deleteTaskCard}
      {listSettingsCard}
      {deleteListCard}
      {
        !!props.userToken ?
        (
          isTodoListShown ?
            <ListBody
              listOptions={listOptions}
              selectedListOption={selectedListOption}
              setSelectedListOption={onListSelectorChange}
              isMenuShown={isMenuShown}
              isNewTaskDialogShown={isNewTaskDialogShown}
              isNewListDialogShown={isNewListDialogShown}
              isLogInCardShown={isLogInCardShown}
              isNewUserCardShown={isNewUserCardShown}
              openNewTaskDialog={openNewTaskDialog}
              openNewListDialog={openNewListDialog}
              openTaskSettingsCard={() => setIsTaskSettingsCardShown(true)}
              updateTask={updateTask}
              activeTask={activeTask}
              setActiveTask={setActiveTask}
              onListSettingsButtonClick={onListSettingsButtonClick}
            />
            :
            <ReminderListBody
              listOptions={props.remindersList}
              selectedListOption= {{}}
              openNewTaskDialog= {{}}
              openNewReminderDialog={openNewTaskDialog}
              openReminderSettingsCard={{}}
              openTaskSettingsCard={{}}
              updateTask={() =>{}}
              activeTask={() =>{}} //task being interacted with for settings menu
              setActiveTask={() =>{}}
            />
        ) : "Tap the logo to sign in."
      }
    </ div>
  );
};

Screen.propTypes = {
}

Screen.defaultProps = {
}

export default Screen;
