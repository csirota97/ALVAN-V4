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

const CONSTANTS = getConstants();

/**
 * @return {Component} screen component
 */
function Screen(props) {
  console.log(props)
  const [isMenuShown, setIsMenuShown] = useState(false)
  const [isNewTaskDialogShown, setIsNewTaskDialogShown] = useState(false)
  const [listOptions, setListOptions] = useState(props.toDoLists)
  const [selectedListOption, setSelectedListOption] = useState(props.defaultSelection)
  const [newTaskName, setNewTaskName] = useState('');
  const [showNewTaskErrorText, setShowNewTaskErrorText] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [reload, setReload] = useState(0);
  const openNewTaskDialog = () => setIsNewTaskDialogShown(true);
  const toggleMenuCard = () => setIsMenuShown(!isMenuShown);
  const triggerReload = () => setReload(reload+1);

  console.log(listOptions)
  console.log(listOptions[0])
  console.log(props.toDoLists)
  console.log(selectedListOption)
  console.log(props.defaultSelection)


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
  return (
    <div className="screen-container">
      <Clock />
      <Logo toggleMenuCard={toggleMenuCard} />
      {isMenuShown && (
        <Card name="Settings" className="front" lockedPos lockedWidth="400px" id={-1} zIndex={{ '-1': 2000 }} posX={window.innerWidth - 410} posY={-50}>
          <div>
          </div>
        </Card>
      )}
      {isNewTaskDialogShown && (
        <ActionCard
          confirmAction={onNewTaskConfirmButtonClick}
          confirmText={newTaskConfirmText}
          cancelAction={onNewTaskCancelButtonClick}
          cancelText={newTaskCancelText}
        >
          <label for="lname">New Task</label><br/>
          <input 
            type="text" 
            id="lname" 
            name="lname" 
            onChange={(event) =>{
              if (showNewTaskErrorText) {
                setShowNewTaskErrorText(false)
              }
              setNewTaskName(event.target.value);
            }}/><br/>
            {showNewTaskErrorText && <div className='error-text'>A Name Must Be Entered To Create A New Task</div>}
        </ActionCard>
      )}
      
      {
        selectedListOption.tasks && 
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
