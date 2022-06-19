import 'jsdom-global/register';
import React from "react";
import WeatherContainer from '../../../src/js/components/weatherContainer';
import { Watch } from 'react-loader-spinner';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from "enzyme";
import mockWeatherCall from '../../../src/js/utils/mockWeatherCall';

configure({adapter: new Adapter()});

jest.mock('../../../src/js/utils/service-factory.js');

describe('WeatherContainer', () => {
  describe('weather data has not been loaded', () => {
    it('should display a loader', () => {
      const wrapper = mount(<WeatherContainer defaultWeather='no data'/>)
      expect(wrapper.find(Watch).length).toEqual(1);
    });
  });

  describe('weather data has been loaded', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<WeatherContainer defaultWeather={mockWeatherCall}/>);
    });

    it('should not display a loader', () => {
      expect(wrapper.find(Watch).length).toEqual(0);
    });
    
    it("should display weather icon", () => {
      expect(wrapper.find('img').length).toEqual(1);
    });
    
    it("should display weather description", () => {
      expect(wrapper.find('.weather-description').text()).toEqual(mockWeatherCall.current.condition.text);
    });
    
    it("should display temperature", () => {
      expect(wrapper.find('.weather-temp').text()).toEqual(`${mockWeatherCall.current.temp_f}°F`);
    });
  });
});