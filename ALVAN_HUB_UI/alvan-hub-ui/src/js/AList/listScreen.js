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

  const openNewTaskDialog = () => setIsNewTaskDialogShown(true);
  const openNewListDialog = () => setIsNewListDialogShown(true);
  const toggleMenuCard = () => setIsMenuShown(!isMenuShown);
  const triggerReload = () => setReload(reload+1);
  const revalidate = () => setValidationTrigger(!validationTrigger)

  const updateTask = (task) => {
    console.log(task)
    console.log(`Make call to flip task: ${task.id}:'${task.description}' to ${!task.completed}`)
    serviceFactory.toDoRequest(CONSTANTS.TODO_REQUEST.UPDATE_EVENT,{eventId: task.id, completed: !task.completed},()=>console.log(`${task.id}:'${task.description}' set to ${!task.completed}`))
    const listOptionsCopy = listOptions.slice().map(listOption => {
      console.log(listOption)
      if (listOption.key === selectedListOption?.key) {
        listOption.tasks = listOption.tasks.map(optionTask => {
          if (optionTask.id === task.id) {
            optionTask.completed = !optionTask.completed;
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

  return (
    <div className="screen-container">
      <Clock />
      <Logo toggleMenuCard={toggleMenuCard} />
          {isMenuShown && (
            <Card name="Settings" className="front" lockedPos lockedWidth="400px" id={-1} zIndex={{ '-1': 2000 }} posX={window.innerWidth - 410} posY={-50}>
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
                        setLogInUserCriteria(defaultNewUser)
                      }}
                      >
                        Log In
                    </div><br />
                    <div
                      className='close-button secondary button' 
                      onClick={() => {
                        setIsMenuShown(false);
                        setIsNewUserCardShown(true);
                        setNewUserCriteria(defaultNewUser)
                      }}
                      >
                        New User
                    </div>
                  </>
                }
              </div>
            </Card>
          )}
          {isNewUserCardShown && (
            <ActionCard

              confirmAction={() => {revalidate()}}
              confirmText={"Add User"}
              cancelAction={() => {setIsNewUserCardShown(false)}}
              cancelText={"Cancel"}
            >
              <NewUserDialog userInfo={newUserCriteria} setUserInfo={setNewUserCriteria} onSubmit={(token) => {setIsNewUserCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
            </ActionCard>
          )}
          {isLogInCardShown && (
            <ActionCard

              confirmAction={() => {revalidate()}}
              confirmText={"Log In"}
              cancelAction={() => {setIsLogInCardShown(false)}}
              cancelText={"Cancel"}
            >
              <LogInDialog userInfo={logInUserCriteria} setUserInfo={setLogInUserCriteria} onSubmit={(token) => {setIsLogInCardShown(false); props.setUserToken(token)}} validationTrigger={validationTrigger} />
            </ActionCard>
          )}
          {isNewTaskDialogShown && (
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
          )}
          {isNewListDialogShown && (
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
          )}
          
      {
        props.unloaded ? <></> : 
        <>
          {
            listOptions && listOptions.length > 0 ? selectedListOption.tasks && 
            <>
              <Selector options={listOptions} selectedOption={selectedListOption} onChange={setSelectedListOption}></Selector>
              <div className='task-list'>
                {
                  selectedListOption.tasks.length > 0 ?
                    selectedListOption.tasks.map((task => 
                      <div className='task' onClick={() => updateTask(task)} onTouch={(task) => updateTask()}>
                        <div className='completed-status-icon'>
                          <ion-icon name={task.completed ? 'checkmark-circle' : 'close-circle'}></ion-icon>
                        </div>
                        {task.description}
                      </div>
                    )) :
                    <div>
                    No Tasks In This List<br/>Click "Add New Task" To Create A New Task
                    </div>
                }
              </div>
              <div className='add-new-task' onClick={openNewTaskDialog}>
                <div className='add-new-task-icon'>
                  <ion-icon name="add-circle"></ion-icon>
                </div>Add New Task
              </div>
              <div className='add-new-task' onClick={openNewListDialog}>
                <div className='add-new-task-icon'>
                  <ion-icon name="add-circle"></ion-icon>
                </div>Add New List
              </div>
            </>
            : 
            <div className='add-new-task' onClick={openNewListDialog}>
              <div className='add-new-task-icon'>
                <ion-icon name="add-circle"></ion-icon>
              </div>Add New List
            </div>

          }
        </>
      }
    </ div>
  );
};

Screen.propTypes = {
}

Screen.defaultProps = {
}

export default Screen;
