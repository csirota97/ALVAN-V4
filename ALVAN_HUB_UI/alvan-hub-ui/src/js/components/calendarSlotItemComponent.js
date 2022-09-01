import React from "react";

const MAX_SUMMARY_LENGTH = 28;
const STATUS_INDICATOR_COLOR = {'confirmed': 'green', 'tentative': 'yellow', 'cancelled': 'red', undefined: 'grey'}

const CalendarSlotItemComponent = (props) => {
    return (
        <div className="calendar-slot-item-component" style={{borderLeftColor: STATUS_INDICATOR_COLOR[props.eventStatus]}}>
            {`${props.summary.substring(0,MAX_SUMMARY_LENGTH)}${props.summary.length > MAX_SUMMARY_LENGTH ? '...': ''}`}
        </div>
    )
};

export default  CalendarSlotItemComponent;