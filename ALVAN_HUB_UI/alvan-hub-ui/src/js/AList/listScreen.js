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
  const [isDeleteTaskCardShown, setIsDeleteTaskCardShown] = useState(false);
  const [listOptions, setListOptions] = useState(props.toDoLists);
  const [selectedListOption, setSelectedListOption] = useState(props.defaultSelection);
  const [newTaskName, setNewTaskName] = useState('');
  const [newListName, setNewListName] = useState('');
  const [showNewTaskErrorText, setShowNewTaskErrorText] = useState(false);
  const [showNewListErrorText, setShowNewListErrorText] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [reload, setReload] = useState(0);
  const [newUserCriteria, setNewUserCriteria] = useState(defaultNewUser);
  const [logInUserCriteria, setLogInUserCriteria] = useState(defaultNewUser);
  const [validationTrigger, setValidationTrigger] = useState(true);
  const [settingsCardClasses, setSettingsCardClasses] = useState('settings-wrapper settings-closing');
  const [activeTask, setActiveTask] = useState(null);
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
  
  const openNewTaskDialog = () => setIsNewTaskDialogShown(true);
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
    if(newTaskName) {
      serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.NEW_EVENT, {listId: selectedListOption.key, description: newTaskName}, (res) => console.log(res));
      // setListOptions(reconstructToDoLists());
      window.location.reload();
      // props.triggerListsReconstruction();
      setIsNewTaskDialogShown(false);
    } else {
      setShowNewTaskErrorText(true);
    }
    setNewTaskName('');
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
        confirmText={"Log In"}
        cancelAction={() => {setIsLogInCardShown(false)}}
        cancelText={"Cancel"}
      >
        <LogInDialog userInfo={logInUserCriteria} setUserInfo={setLogInUserCriteria} onSubmit={(token) => {setIsLogInCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
      </ActionCard>
    )
  );

  useEffect(()=>{console.log(activeTask)})

  const newTaskCard = (isNewTaskDialogShown && (
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
      </ActionCard>
    )
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
      /><br/>
        {showNewListErrorText && <div className='error-text'>A Name Must Be Entered To Create A New List</div>}
      </ActionCard>
    )
  );

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
              <div
                className='close-button secondary button' 
                onClick={() => {
                  localStorage.setItem('userToken', undefined);
                  props.setUserToken(null);
                  window.location.reload();
                  toggleMenuCard(); 
                }}
                >
                  Log Out
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
                  Log In
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
      <div
        className='create-button secondary button'
        onClick={() => {setIsTaskSettingsCardShown(false); setIsDeleteTaskCardShown(true);}}
        >
        Delete Task
      </div>
      <br/>
      {showNewListErrorText && <div className='error-text'>A Name Must Be Entered To Create A New List</div>}
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
      {showNewListErrorText && <div className='error-text'>A Name Must Be Entered To Create A New List</div>}
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
      />
    </ div>
  );
};

Screen.propTypes = {
}

Screen.defaultProps = {
}

export default Screen;
