import React from "react";

const CalendarSlotComponent = (props) => {
  return (
    <div className="calendar-slot-component" style={{left: `${(props.column - 1) * 25}%`}}>
      {props.children}
    </div>
  )
};

export default  CalendarSlotComponent;