/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Selector from '../components/dropdownSelector';
import TaskRow from './taskRow';

function ListBody(props) {
  if (props.unloaded) return undefined;

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
    setActiveTask,
    onListSettingsButtonClick,
  } = props;

  return (
    (!!listOptions && listOptions.length > 0) ? selectedListOption.tasks
    && (
      <>
        <Selector
          options={listOptions}
          selectedOption={selectedListOption}
          onChange={setSelectedListOption}
          isUnselectable={
            isMenuShown
            || isNewTaskDialogShown
            || isNewListDialogShown
            || isLogInCardShown
            || isNewUserCardShown
          }
          showSettingsButton
          settingsButtonOnClick={() => { onListSettingsButtonClick(); }}
        />
        <div>
          {
            selectedListOption.tasks.length > 0
              ? (
                <div className="task-list">

                  {selectedListOption.tasks.map((task => (task.completed || task.inProgress
                    ? undefined
                    : (
                      <TaskRow
                        task={task}
                        updateTask={updateTask}
                        openTaskSettingsCard={openTaskSettingsCard}
                        setActiveTask={setActiveTask}
                      />
                    ))
                  ))}

                  {
                    selectedListOption.tasks.some(task => task.inProgress)
                      && selectedListOption.tasks.some(task => !task.inProgress) ? (
                        <>
                          <br />
                          <hr className="task-divider" />
                        </>
                      ) : undefined
                  }
                  {
                    selectedListOption.tasks.some(task => task.inProgress)
                      ? (
                        <h3 className="task-section-heading">
                          In Progress Tasks
                        </h3>
                      ) : null
                  }
                  {selectedListOption.tasks.map((task => (task.inProgress
                    ? (
                      <TaskRow
                        task={task}
                        updateTask={updateTask}
                        openTaskSettingsCard={openTaskSettingsCard}
                        setActiveTask={setActiveTask}
                      />
                    )
                    : undefined)
                  ))}

                  {
                    selectedListOption.tasks.some(task => task.completed)
                    && selectedListOption.tasks.some(task => !task.completed)
                      ? (
                        <>
                          <br />
                          <hr className="task-divider" />
                        </>
                      ) : undefined
                  }
                  {
                    selectedListOption.tasks.some(task => task.completed)
                      ? (
                        <h3 className="task-section-heading">
                          Completed Tasks
                        </h3>
                      )
                      : null
                  }
                  {selectedListOption.tasks.map((task => (task.completed
                    ? (
                      <TaskRow
                        task={task}
                        updateTask={updateTask}
                        openTaskSettingsCard={openTaskSettingsCard}
                        setActiveTask={setActiveTask}
                      />
                    )
                    : undefined)
                  ))}
                </div>
              )
              : (
                <div>
                  No Tasks In This List
                  <br />
                  Click "Add New Task" To Create A New Task
                </div>
              )
          }
        </div>

        <div className="add-new-task" onClick={openNewTaskDialog}>
          <div className="add-new-task-icon">
            <ion-icon name="add-circle" />
          </div>
          Add New Task
        </div>

      </>
    )
      : (
        <div className="add-new-task" onClick={openNewListDialog}>
          <div className="add-new-task-icon">
            <ion-icon name="add-circle" />
          </div>
          Add New List
        </div>
      )

  );
}

export default ListBody;
