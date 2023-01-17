import React from "react";
import Selector from "../components/dropdownSelector";
import TaskRow from "./taskRow";

const ListBody = (props) => {
  if (props.unloaded) return undefined

  const {
    listOptions,
    selectedListOption,
    setSelectedListOption,
    isMenuShown,
    isNewTaskDialogShown,
    isNewListDialogShown,
    isLogInCardShown,
    isNewUserCardShown,
    openNewTaskDialog,
    openNewListDialog,
    openTaskSettingsCard,
    updateTask,
    activeTask, //task being interacted with for settings menu
    setActiveTask,
  } = props

  return (
  <>
    {
      listOptions && listOptions.length > 0 ? selectedListOption.tasks && 
      <>
        <Selector 
          options={listOptions}
          selectedOption={selectedListOption}
          onChange={setSelectedListOption}
          isUnselectable={
            isMenuShown ||
            isNewTaskDialogShown ||
            isNewListDialogShown ||
            isLogInCardShown ||
            isNewUserCardShown
          }
        />
        <div className='task-list'>
          {
            selectedListOption.tasks.length > 0 ?
            
              (<div>
                
              {selectedListOption.tasks.map((task =>
                task.completed || task.inProgress ?
                  undefined :
                  <TaskRow
                    task={task}
                    updateTask={updateTask}
                    openTaskSettingsCard={openTaskSettingsCard}
                    setActiveTask={setActiveTask}
                  />
              ))}

              
              {selectedListOption.tasks.some(task => task.inProgress) && selectedListOption.tasks.some(task => !task.inProgress) ? <><br /><hr /></>:undefined}
              {selectedListOption.tasks.some(task => task.inProgress) ? "In Progress Tasks":""}
              {selectedListOption.tasks.map((task => 
                task.inProgress ?
                  <TaskRow
                    task={task}
                    updateTask={updateTask}
                    openTaskSettingsCard={openTaskSettingsCard}
                    setActiveTask={setActiveTask}
                  /> :
                  undefined
              ))}

              {selectedListOption.tasks.some(task => task.completed) && selectedListOption.tasks.some(task => !task.completed) ? <><br /><hr /></>:undefined}
              {selectedListOption.tasks.some(task => task.completed) ? "Completed Tasks":""}
              {selectedListOption.tasks.map((task => 
                task.completed ?
                  <TaskRow
                    task={task}
                    updateTask={updateTask}
                    openTaskSettingsCard={openTaskSettingsCard}
                    setActiveTask={setActiveTask}
                  /> :
                  undefined
              ))}
              </div>
              )
               :
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
  </>);
}

export default ListBody;