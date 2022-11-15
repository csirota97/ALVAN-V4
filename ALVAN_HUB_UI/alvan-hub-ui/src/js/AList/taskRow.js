import React from "react";

const TaskRow = (props) => {
  const {task, updateTask, openTaskSettingsCard, setActiveTask} = props;

  return (
    <div className='task' onClick={() => {console.log(task); updateTask(task)}} onTouch={(task) => updateTask()}>
      <div className='completed-status-icon'>
        <ion-icon name={task.completed ? 'checkmark-circle' : 'close-circle'}></ion-icon>
      </div>
      {task.description}
      <div className='task-settings-icon' onClick={(event) => {event.stopPropagation(); openTaskSettingsCard(); setActiveTask(task);}}>
        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
      </div>
    </div>
  );
}

export default TaskRow;