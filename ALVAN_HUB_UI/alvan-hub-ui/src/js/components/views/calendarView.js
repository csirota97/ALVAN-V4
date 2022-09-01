import React from "react";
import CalendarSlotComponent from "../calendarSlotComponent";
import CalendarSlotItemComponent from "../calendarSlotItemComponent";
import WeatherCalendarView from "../weatherCalendarView";

function CalendarView(props) {
  const { defaultWeather, setDefaultWeather, calendarData } = props;

  console.log(calendarData)
  const eventsByDay = { today: [], tomorrow: [], inTwoDays: [] };

  // TODO: get rid of this and replace current date definition with new Date()
  const event1Date = new Date(calendarData.items.items[2].start.date);

  calendarData.items.items.forEach(event => {
    const eventDate = new Date((new Date()).setDate(new Date(event.start.date).getDate() + 1));
    // const currentDate = new Date();
    const currentDate = event1Date;
    const tomorrowDate = new Date((new Date()).setDate(currentDate.getDate() + 1));
    const dateInTwoDays = new Date((new Date()).setDate(currentDate.getDate() + 2));

    const isToday = () => eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear();
 
    const isTomorrow = () => eventDate.getDate() === tomorrowDate.getDate() &&
      eventDate.getMonth() === tomorrowDate.getMonth() &&
      eventDate.getFullYear() === tomorrowDate.getFullYear();
 
    const isInTwoDays = () => eventDate.getDate() === dateInTwoDays.getDate() &&
      eventDate.getMonth() === dateInTwoDays.getMonth() &&
      eventDate.getFullYear() === dateInTwoDays.getFullYear();

    if (isToday()) {
      eventsByDay.today.push(event);
    } else if (isTomorrow()) {
      eventsByDay.tomorrow.push(event);
    } else if (isInTwoDays()) {
      eventsByDay.inTwoDays.push(event);
    }
  });

  console.log(eventsByDay)

  return (<>
    <WeatherCalendarView defaultWeather={defaultWeather} setDefaultWeather={setDefaultWeather} />
    <CalendarSlotComponent column={1}>
      {
        eventsByDay.today.map(event => (
          <CalendarSlotItemComponent
            summary={event.summary}
            eventStatus={event.status}
          />
        ))
      }
    </CalendarSlotComponent>
    <div className="calendar-separator line-1" />
    <CalendarSlotComponent column={2}>
      {
        eventsByDay.tomorrow.map(event => (
          <CalendarSlotItemComponent 
            summary={event.summary}
            eventStatus={event.status}
          />
        ))
      }
    </CalendarSlotComponent>
    <div className="calendar-separator line-2" />
    <CalendarSlotComponent column={3}>
      {
        eventsByDay.inTwoDays.map(event => (
          <CalendarSlotItemComponent
            summary={event.summary}
            eventStatus={event.status}
          />))
      }
    </CalendarSlotComponent>
    <div className="calendar-separator line-3" />
  </>);
}

export default CalendarView;