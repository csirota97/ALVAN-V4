import React from "react";
import ReminderRow from "./reminderRow";

const ReminderListBody = (props) => {
  if (props.unloaded) return undefined

  const {
    listOptions,
    selectedListOption,
    openNewReminderDialog,
    openReminderSettingsCard,
    updateTask,
    activeTask, //task being interacted with for settings menu
    setActiveTask
  } = props

  console.log(listOptions)
  console.log(listOptions && listOptions.reminders.length > 0)
  return (
  <>
    {
      listOptions && listOptions.reminders.length > 0 ?
      <>
        <div className='task-list'>
          {(
            <div>
            <h3>Reminders</h3>
            {listOptions.reminders.map((task =>
              <ReminderRow
                task={task}
                updateTask={updateTask}
                openReminderSettingsCard={openReminderSettingsCard}
                setActiveTask={setActiveTask}
              />
            ))}

            {/* Completed Tasks? */}
            {/* {selectedListOption.tasks.some(task => task.completed) && selectedListOption.tasks.some(task => !task.completed) ? <><br /><hr /></>:undefined}
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
            ))} */}
            </div>
          )}
        <div className='add-new-task' onClick={openNewReminderDialog}>
          <div className='add-new-task-icon'>
            <ion-icon name="add-circle"></ion-icon>
          </div>Add New Reminder
        </div>
        </div>
      </>
      : 
      "No Reminders"

    }
  </>);
}

export default ReminderListBody;