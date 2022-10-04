import React from "react";

const MAX_SUMMARY_LENGTH = 28;
const STATUS_INDICATOR_COLOR = {'Confirmed': 'green', 'Tentative': 'yellow', 'Canceled': 'red', undefined: 'grey'}

const CalendarSlotItemComponent = (props) => {
    return (
        <div className="calendar-slot-item-component" style={{borderLeftColor: STATUS_INDICATOR_COLOR[props.eventStatus]}}>
            {props.summary}
            {/* {`${props.description.substring(0,MAX_SUMMARY_LENGTH)}${props.description.length > MAX_SUMMARY_LENGTH ? '...': ''}`} */}
        </div>
    )
};

export default  CalendarSlotItemComponent;