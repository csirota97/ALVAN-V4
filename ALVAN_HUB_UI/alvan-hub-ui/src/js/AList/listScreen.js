import React, { useState } from 'react';
import Clock from '../components/clock';
import Card from '../components/card';
import Logo from '../components/logo';
import Selector from '../components/dropdownSelector';
import mockToDoLists from '../utils/mockToDoLists';

/**
 * @return {Component} screen component
 */
function Screen(props) {
  const [isMenuShown, setIsMenuShown] = useState(false)
  const [isNewTaskDialogShown, setIsNewTaskDialogShown] = useState(false)
  const [listOptions, setListOptions] = useState(mockToDoLists)
  const [selectedListOption, setSelectedListOption] = useState(listOptions[0])
  const [newTaskName, setNewTaskName] = useState('');
  const [showNewTaskErrorText, setShowNewTaskErrorText] = useState(false);
  const toggleMenuCard = () => setIsMenuShown(!isMenuShown);
  const openNewTaskDialog = () => setIsNewTaskDialogShown(true);

  const updateTask = (task) => {
    console.log(task)
    console.log(`Make call to flip task: ${task.id}:'${task.description}' to ${!task.completed}`)
    const listOptionsCopy = listOptions.slice().map(listOption => {
      if (listOption.key === selectedListOption.key) {
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
        <div id='new-task-dialog' className='center'>
          <Card name="New Task" className="front" lockedPos lockedWidth="400px" id={-2} zIndex={{ '-2': 10000000 }} posX={0} posY={-50}>          
            <label for="lname">New Task</label><br/>
            <input 
              type="text" 
              id="lname" 
              name="lname" 
              onChange={(event) =>{
                if (showNewTaskErrorText) {
                  setShowNewTaskErrorText(false)
                }
                setNewTaskName(event);
              }}/><br/>
              {showNewTaskErrorText && <div className='error-text'>A Name Must Be Entered To Create A New Task</div>}
            <div
              className='create-button button'
              onClick={() => {
                if(newTaskName) {
                  console.log('Make call to create new task on current list')
                  setIsNewTaskDialogShown(false);
                } else {
                  setShowNewTaskErrorText(true);
                }
              }}
            >
              Create Task
            </div>
            <div className='close-button button' onClick={() => setIsNewTaskDialogShown(false)}>
              Close
            </div>
          </Card>
        </div>
      )}
      
      <Selector options={mockToDoLists} selectedOption={selectedListOption} onChange={setSelectedListOption}></Selector>
      <div className='task-list'>
        {
          selectedListOption.tasks.map((task => 
            <div className='task' onClick={() => updateTask(task)} onTouch={(task) => updateTask()}>
              <div className='completed-status-icon'>
                <ion-icon name={task.completed ? 'checkmark-circle' : 'close-circle'}></ion-icon>
              </div>
              {task.description}
            </div>
          ))
        }
      </div>
      <div className='add-new-task' onClick={openNewTaskDialog}>
        <div className='add-new-task-icon'>
          <ion-icon name="add-circle"></ion-icon>
        </div>Add New Task
      </div>
    </ div>
  );
};

Screen.propTypes = {
}

Screen.defaultProps = {
}

export default Screen;
