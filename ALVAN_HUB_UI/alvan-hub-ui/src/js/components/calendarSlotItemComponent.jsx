import React from 'react';

const STATUS_INDICATOR_COLOR = {
  Confirmed: 'green', Tentative: 'yellow', Canceled: 'red', undefined: 'grey',
};

function CalendarSlotItemComponent(props) {
  return (
    <div
      className="calendar-slot-item-component"
      style={{ borderLeftColor: STATUS_INDICATOR_COLOR[props.eventStatus] }}
    >
      {props.summary}
    </div>
  );
}

export default CalendarSlotItemComponent;
