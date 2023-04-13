import React from 'react';

const STATUS_INDICATOR_COLOR = {
  Confirmed: 'green', Tentative: 'yellow', Canceled: 'red', undefined: 'grey',
};

function CalendarSlotItemComponent(props) {
  return (
    <div
      className={`calendar-slot-item-component calendar-slot-status-${props.eventStatus.toLowerCase()}`}
      style={{ borderLeftColor: STATUS_INDICATOR_COLOR[props.eventStatus] }}
    >
      <b>{props.time}</b>
      <span>
        {props.summary}
      </span>
    </div>
  );
}

export default CalendarSlotItemComponent;
