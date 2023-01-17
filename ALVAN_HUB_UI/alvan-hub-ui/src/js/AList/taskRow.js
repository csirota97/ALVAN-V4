import React from "react";

const TaskRow = (props) => {
  const {task, updateTask, openTaskSettingsCard, setActiveTask} = props;

  let icon = 'close-circle';
  if (task.inProgress) {
    icon = 'disc-outline';
  } else if (task.completed) {
    icon = 'checkmark-circle';
  }

  return (
    <div className='task' onClick={() => {console.log(task); updateTask(task)}} onTouch={(task) => updateTask()}>
      <div className='completed-status-icon'>
        <ion-icon name={icon}></ion-icon>
      </div>
      {task.description}
      <div className='task-settings-icon' onClick={(event) => {event.stopPropagation(); openTaskSettingsCard(); setActiveTask(task);}}>
        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
      </div>
    </div>
  );
}

export default TaskRow;