import 'jsdom-global/register';
import React from "react";
// import SpeechRecognizer from '../../../src/js/components/speechRecognizer';
import WeatherCalendarView from '../../../src/js/components/weatherCalendarView';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, EnzymeAdapter } from "enzyme";
import mockWeatherCall from '../../../src/js/utils/mockWeatherCall';
import { Watch } from 'react-loader-spinner';

configure({adapter: new Adapter()});

jest.mock('../../../src/js/utils/service-factory.js');
describe('WeatherCalendarView', () => {
  let WCVWrapper;
  let mockTrigger = false;
  const mockSetDefaultWeather = jest.fn();
  const mockDefaultWeather = mockWeatherCall;
  beforeEach(() => {
    WCVWrapper = mount(<WeatherCalendarView trigger={mockTrigger} defaultWeather={mockDefaultWeather} setDefaultWeather={mockSetDefaultWeather} />)
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

      it('should display loading indicators', () => {
        expect(noDataWrapper.find(Watch).length).toBe(4);
      });

      it('should not show any current weather data', () => {
        expect(noDataWrapper.find('#current-data').length).toBe(0);
      });
    });

    describe('data has been recieved', () => {
      it('should not display loading indicators', () => {
        expect(WCVWrapper.find(Watch).length).toBe(0);
      });

      it('should display weather indicators', () => {
        expect(WCVWrapper.find('.weather-icon').length).toBe(4);
      });

      it('should show current weather data', () => {
        expect(WCVWrapper.find('#current-data').length).toBe(1);
      });

      it('should show current weather data text', () => {
        expect(WCVWrapper.find('#current-data').text()).toBe("OvercastTemp: 66.9°FFeels Like: 66.9°FWind Speed: 9.4 mph");
      });
    });
  });
});