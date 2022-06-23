import React from "react";
import WeatherCalendarView from "../weatherCalendarView";

function CalendarView(props) {
  const { defaultWeather, setDefaultWeather } = props;
  return (<>
    <WeatherCalendarView defaultWeather={defaultWeather} setDefaultWeather={setDefaultWeather} />
    <div className="calendar-separator line-1" />
    <div className="calendar-separator line-2" />
    <div className="calendar-separator line-3" />
  </>);
}

export default CalendarView;