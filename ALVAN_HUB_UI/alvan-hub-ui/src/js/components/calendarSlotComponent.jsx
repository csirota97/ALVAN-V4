import React from 'react';

function CalendarSlotComponent(props) {
  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div className="calendar-slot-container">
      <div className="calendar-slot-component" style={{ left: `${(props.column - 1) * 25}%` }}>
        {props.children}
      </div>
    </div>
  );
}

export default CalendarSlotComponent;
