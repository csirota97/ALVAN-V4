import React from "react";
import "../utils/datePrototype";

const TaskRow = (props) => {
  const {task, updateTask, openTaskSettingsCard, setActiveTask} = props;

  let icon = 'close-circle';
  if (task.inProgress) {
    icon = 'disc-outline';
  } else if (task.completed) {
    icon = 'checkmark-circle';
  }

  const getRepetitionFrequencyString = task => {
    if (task.repeatUnit === 0) {
      if (task.repeatInterval === 1) {
        return ' daily';
      } else {
        return ` every ${task.repeatInterval} days`;
      }
    } else if (task.repeatUnit === 1) {
      if (task.repeatInterval === 1) {
        return ' weekly';
      } else {
        return ` every ${task.repeatInterval} weeks`;
      }
    } else if (task.repeatUnit === 2) {
      return ' monthly';
    }
  };
  const nextRepeatingDate = task => {
    const today = new Date();
    let resetDate = task.repeatStartDate;

    console.log(resetDate)
    if (task.repeatUnit === 0) {
      if (task.repeatInterval === 1) {
        resetDate = new Date().addDays(1);
      } else {
        while (resetDate < today) {
          resetDate = resetDate.addDays(task.repeatInterval);
        }
      }
    } else if (task.repeatUnit === 1) {
      while (resetDate < today) {
        resetDate = resetDate.addDays(7*task.repeatInterval);
      }
    } else if (task.repeatUnit === 2) {
      while (resetDate < today) {
        resetDate = resetDate.addMonths(1);
      }
    }
    return resetDate.toLocaleDateString();
  };

  return (
    <div className='task' onClick={() => {console.log(task); updateTask(task)}} onTouch={(task) => updateTask()}>
      <div className='completed-status-icon'>
        <ion-icon name={icon}></ion-icon>
      </div>
      <p className='row-text'>{task.description}</p>
      <div className='task-settings-icon' onClick={(event) => {event.stopPropagation(); openTaskSettingsCard(); setActiveTask(task);}}>
        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
      </div>
      {console.log(task)}
      {
        task.repeatInterval !== -1 &&
        <>
          <hr className="row-break"/>
          <div className='helper-text'>Resets {getRepetitionFrequencyString(task)}</div>
          {
            !(task.repeatUnit === 0 && task.repeatInterval === 1) &&
            <>
              <div className='helper-text'>Next Reset: {nextRepeatingDate(task)}</div>
            </>
          }
        </>
      }
    </div>
  );
}

export default TaskRow;