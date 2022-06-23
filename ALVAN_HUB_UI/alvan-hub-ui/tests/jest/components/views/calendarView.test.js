import 'jsdom-global/register';
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from "enzyme";
import CalendarView from '../../../../src/js/components/views/calendarView';
import WeatherCalendarView from '../../../../src/js/components/weatherCalendarView';

configure({adapter: new Adapter()});

describe('CalendarView', () => {
  let calendarView = undefined;
  const mockSetDefaultWeather = jest.fn();
  beforeEach(() => {
    calendarView = shallow(<CalendarView defaultWeather={''} setDefaultWeather={mockSetDefaultWeather}/>)
  });

  it("should render a WeatherCalendarView", () => {
    expect(calendarView.find(WeatherCalendarView).length).toBe(1);
  })

  it("should render 3 calendar separator lines", () => {
    expect(calendarView.find('.calendar-separator').length).toBe(3);
  })
});