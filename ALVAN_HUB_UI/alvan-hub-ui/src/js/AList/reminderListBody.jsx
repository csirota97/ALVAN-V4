import React from 'react';
import ReminderRow from './reminderRow';

function ReminderListBody(props) {
  if (props.unloaded) return undefined;

  const {
    listOptions,
    openNewReminderDialog,
    openReminderSettingsCard,
    updateTask,
    setActiveTask,
  } = props;

  return (
    <>
      <h2 className="task-section-heading">Reminders</h2>
      {
        listOptions && listOptions.reminders.length > 0
          ? (
            <div className="task-list">
              {(
                <div>
                  {listOptions.reminders.map((task => (
                    <ReminderRow
                      task={task}
                      updateTask={updateTask}
                      openReminderSettingsCard={openReminderSettingsCard}
                      setActiveTask={setActiveTask}
                    />
                  )
                  ))}

                  {/* Completed Tasks? */}
                  {/* {selectedListOption.tasks.some(task => task.completed)
                  && selectedListOption.tasks.some(task => !task.completed) ? <><br /><hr /></>:undefined}
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
            </div>
          )
          : (
            <>
              No Reminders
              <br />
            </>
          )
      }

      <div className="add-new-task" onClick={openNewReminderDialog}>
        <div className="add-new-task-icon">
          <ion-icon name="add-circle" />
        </div>
        Add New Reminder
      </div>
    </>
  );
}

export default ReminderListBody;
