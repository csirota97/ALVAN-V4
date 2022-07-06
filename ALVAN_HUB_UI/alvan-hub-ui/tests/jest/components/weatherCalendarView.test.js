import 'jsdom-global/register';
import React from "react";
import WeatherCalendarView from '../../../src/js/components/weatherCalendarView';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from "enzyme";
import mockWeatherCall from '../../../src/js/utils/mockWeatherCall';
import { Watch } from 'react-loader-spinner';

configure({adapter: new Adapter()});

describe('WeatherCalendarView', () => {
  let WCVWrapper;
  let mockTrigger = false;
  const mockSetDefaultWeather = jest.fn();
  const mockDefaultWeather = mockWeatherCall;
  beforeEach(() => {
    console.log(`\n\n\n${process.env.NODE_ENV}\n\n\n`);
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 6, 21));
    WCVWrapper = mount(<WeatherCalendarView trigger={mockTrigger} defaultWeather={mockDefaultWeather} setDefaultWeather={mockSetDefaultWeather} />)
  });

  afterAll(() => {
      jest.useRealTimers();
  });

  describe('should render', () => {
    it('4 calendare view slots', () => {
      expect(WCVWrapper.find('.calendar-weather-view').length).toBe(4);
    });
    
    it('the day 2 days out to be Saturday', () => {
      expect(WCVWrapper.find('.weather-3').find('h2').text()).toBe('Saturday');
    });

    describe('data hasn\'t been recieved yet', () => {
      let noDataWrapper;
      beforeEach(() => {
        noDataWrapper = mount(<WeatherCalendarView trigger={mockTrigger} setDefaultWeather={mockSetDefaultWeather} />);
      })

      it('should render loading indicators', () => {
        expect(noDataWrapper.find(Watch).length).toBe(4);
      });

      it('should not render any current weather data', () => {
        expect(noDataWrapper.find('#current-data').length).toBe(0);
      });
    });

    describe('data has been recieved', () => {
      it('should not render loading indicators', () => {
        expect(WCVWrapper.find(Watch).length).toBe(0);
      });

      it('should render weather indicators', () => {
        expect(WCVWrapper.find('.weather-icon').length).toBe(4);
      });

      it('should render current weather data', () => {
        expect(WCVWrapper.find('#current-data').length).toBe(1);
      });

      it('should render current weather data text', () => {
        expect(WCVWrapper.find('#current-data').text()).toBe("OvercastTemp: 66.9°FFeels Like: 66.9°FWind Speed: 9.4 mph");
      });

      it('should render 3 min temperatures', () => {
        expect(WCVWrapper.find('.min-temp').length).toBe(3);
      });

      it('should render 3 max temperatures', () => {
        expect(WCVWrapper.find('.max-temp').length).toBe(3);
      });

      it('should have correct first min temperatures', () => {
        expect(WCVWrapper.find('.min-temp').first().text()).toBe("Min: 61.3°F");
      });

      it('should have correct first max temperatures', () => {
        expect(WCVWrapper.find('.max-temp').first().text()).toBe("Max: 67.5°F");
      });

      it('should have correct last min temperatures', () => {
        expect(WCVWrapper.find('.min-temp').last().text()).toBe("Min: 63.9°F");
      });

      it('should have correct last max temperatures', () => {
        expect(WCVWrapper.find('.max-temp').last().text()).toBe("Max: 89.2°F");
      });
    });
  });
});