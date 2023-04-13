import React, { useEffect, useState } from 'react';
import serviceFactory from '../../utils/service-factory';
import CalendarSlotComponent from '../calendarSlotComponent';
import CalendarSlotItemComponent from '../calendarSlotItemComponent';
import WeatherCalendarView from '../weatherCalendarView';

function CalendarView(props) {
  const { defaultWeather, setDefaultWeather, userToken } = props;

  const [initialRender, setInitialRender] = useState(true);
  const [reminders, setReminders] = useState({ reminders: [] });
  const [calendarData, setCalendarData] = useState({ today: [], tomorrow: [], inTwoDays: [] });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetReminders = () => serviceFactory.getRemindersWithOffsetRequest(userToken[0], 86400, setReminders);

  const currentDate = new Date();
  const tomorrowDate = new Date((new Date()).setDate(currentDate.getDate() + 1));
  const dateInTwoDays = new Date((new Date()).setDate(currentDate.getDate() + 2));

  const isToday = (eventDate) => eventDate.getDate() === currentDate.getDate()
    && eventDate.getMonth() === currentDate.getMonth()
    && eventDate.getFullYear() === currentDate.getFullYear();

  const isTomorrow = (eventDate) => eventDate.getDate() === tomorrowDate.getDate()
    && eventDate.getMonth() === tomorrowDate.getMonth()
    && eventDate.getFullYear() === tomorrowDate.getFullYear();

  const isInTwoDays = (eventDate) => eventDate.getDate() === dateInTwoDays.getDate()
    && eventDate.getMonth() === dateInTwoDays.getMonth()
    && eventDate.getFullYear() === dateInTwoDays.getFullYear();

  useEffect(() => {
    if (initialRender && userToken) {
      resetReminders();
      setInitialRender(false);
    }
  }, [initialRender, userToken, resetReminders]);

  useEffect(() => {
    const eventsByDay = { today: [], tomorrow: [], inTwoDays: [] };
    reminders.reminders.forEach(reminder => {
      const event = {};
      event.startDateTime = new Date(1000 * reminder[3]);
      event.description = reminder[2];
      if (reminder[3] * 1000 > currentDate.getTime()) {
        event.status = 'Confirmed';
      } else {
        event.status = 'Canceled';
      }

      if (isToday(event.startDateTime)) {
        eventsByDay.today.push(event);
      } else if (isTomorrow(event.startDateTime)) {
        eventsByDay.tomorrow.push(event);
      } else if (isInTwoDays(event.startDateTime)) {
        eventsByDay.inTwoDays.push(event);
      }
    });
    setCalendarData(eventsByDay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminders]);

  return (
    <WeatherCalendarView
      defaultWeather={defaultWeather}
      setDefaultWeather={setDefaultWeather}
      todayEvents={(
        <CalendarSlotComponent column={1}>
          {
            calendarData.today.map(event => (
              <CalendarSlotItemComponent
                time={event.startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                summary={event.description}
                eventStatus={event.status}
              />
            ))
          }
        </CalendarSlotComponent>
      )}
      tomorrowEvents={(
        <CalendarSlotComponent column={2}>
          {
            calendarData.tomorrow.map(event => (
              <CalendarSlotItemComponent
                time={event.startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                summary={event.description}
                eventStatus={event.status}
              />
            ))
          }
        </CalendarSlotComponent>
      )}
      inTwoDaysEvents={(
        <CalendarSlotComponent column={3}>
          {
            calendarData.inTwoDays.map(event => (
              <CalendarSlotItemComponent
                time={event.startDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                summary={event.description}
                eventStatus={event.status}
              />
            ))
          }
        </CalendarSlotComponent>
      )}
    />
  );
}

export default CalendarView;
