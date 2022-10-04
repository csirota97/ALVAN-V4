import React from "react";
import CalendarSlotComponent from "../calendarSlotComponent";
import CalendarSlotItemComponent from "../calendarSlotItemComponent";
import WeatherCalendarView from "../weatherCalendarView";

function CalendarView(props) {
  const { defaultWeather, setDefaultWeather, calendarData } = props;

  console.log(calendarData)
  const eventsByDay = { today: [], tomorrow: [], inTwoDays: [] };

  calendarData.forEach(event => {
    console.log(event)
    const eventDate = new Date(event.startDateTime);
    console.log(eventDate)
    // const currentDate = new Date();
    const currentDate = new Date();
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

    console.log(eventDate.getDate())
    console.log(eventDate.getMonth())
    console.log(eventDate.getYear())
    console.log('--------------------')
    console.log(currentDate.getDate())
    console.log(currentDate.getMonth())
    console.log(currentDate.getYear())
    console.log('--------------------')
    console.log(tomorrowDate.getDate())
    console.log(tomorrowDate.getMonth())
    console.log(tomorrowDate.getYear())
    console.log('--------------------')
    console.log(dateInTwoDays.getDate())
    console.log(dateInTwoDays.getMonth())
    console.log(dateInTwoDays.getYear())
    console.log()
    console.log()
    console.log(isToday())
    console.log(isTomorrow())
    console.log(isInTwoDays())
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
            summary={event.description}
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
            summary={event.description}
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
            summary={event.description}
            eventStatus={event.status}
          />))
      }
    </CalendarSlotComponent>
    <div className="calendar-separator line-3" />
  </>);
}

export default CalendarView;