import React from 'react';
import '../utils/datePrototype';

function ReminderRow(props) {
  const {
    task, updateTask, openTaskSettingsCard, setActiveTask,
  } = props;
  const reminderDescription = task[2];
  const reminderTimecode = task[3];
  const reminderDateTime = new Date(1000 * reminderTimecode);

  console.log(task);

  return (
    <div
      className="task"
      onClick={() => { console.log(task); updateTask(task); }}
    >
      <div className="completed-status-icon">
        <ion-icon name="time-outline" />
      </div>
      <p className="row-text">{reminderDescription}</p>
      <div
        className="task-settings-icon"
        onClick={(event) => { event.stopPropagation(); openTaskSettingsCard(); setActiveTask(task); }}
      >
        <ion-icon name="ellipsis-horizontal-outline" />
      </div>
      <hr className="row-break" />
      <div className="helper-text">
        {/* eslint-disable-next-line max-len */}
        {`${reminderDateTime.toLocaleDateString([], { dateStyle: 'medium' })} - ${reminderDateTime.toLocaleTimeString([], { timeStyle: 'short' })}`}
      </div>

    </div>
  );
}

export default ReminderRow;
