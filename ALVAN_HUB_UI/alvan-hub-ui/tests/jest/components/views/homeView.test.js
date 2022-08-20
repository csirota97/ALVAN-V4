import 'jsdom-global/register';
import React from "react";
import HomeView from '../../../../src/js/components/views/homeView';
import Card from "../../../../src/js/components/card";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import mockCalendarCall from '../../../../src/js/utils/mockCalendarCalls';

import { configure, mount } from "enzyme";

configure({adapter: new Adapter()});

jest.mock("../../../../src/js/components/speechRecognizer", () => () => {
  const MockSpeechRecognition = "default-speech-recognition-mock";
  return <MockSpeechRecognition />;
});

jest.mock("../../../../src/js/components/clock", () => () => {
  const MockClock = "default-clock-mock";
  return <MockClock />;
});
let homeViewWrapper;

describe("HomeView", () => {
  beforeEach(() => {
    homeViewWrapper = mount(<HomeView calendarData={mockCalendarCall} setDefaultWeather={()=>{}}/>);
    homeViewWrapper.find('#show-calendar-events').simulate('click');
  });

  describe("should render", () => {
    it('calendar event cards', () => {
      expect(homeViewWrapper.find('.calendar-card').length).toBe(5);
    })
    it('a weather card', () => {
      expect(homeViewWrapper.find('.weather-card').length).toBe(1);
    })
  });

  describe("should move unlocked cards when dragged", () => {
    it('by mouse', () => {
      homeViewWrapper.find('.card-base').first().invoke("onMouseDown")(
        {
          nativeEvent: {
            offsetX: 4,
            offsetY: 111
          }
        }
      );
      homeViewWrapper.find('.card-base').first().invoke("onMouseMove")(
        {
          nativeEvent: {
            offsetX: 10,
            offsetY: 121
          }
        }
      );
      homeViewWrapper.find('.card-base').first().invoke("onMouseUp")();
      expect(homeViewWrapper.find('.card-base').first().props().style).toHaveProperty("top", 121);
      expect(homeViewWrapper.find('.card-base').first().props().style).toHaveProperty("left", 6);
    });

    it("cards should move to front when selected", () => {
      homeViewWrapper.find('.card-base').at(2).invoke("onMouseDown")(
        {
          nativeEvent: {
            offsetX: 4,
            offsetY: 111
          }
        }
      )
      homeViewWrapper.find('.card-base').at(2).invoke("onMouseMove")(
        {
          nativeEvent: {
            offsetX: 10,
            offsetY: 121
          }
        }
      );
      homeViewWrapper.find('.card-base').at(2).invoke("onMouseUp");
      expect(homeViewWrapper.find(Card).at(2).props().zIndex[2]).toBe(50);
    });

    it('by touch', () => {
      homeViewWrapper.find('.card-base').first().invoke("onTouchStart")(
        {
          targetTouches: [{
            pageX: 4,
            pageY: 111
          }],
          target: { getBoundingClientRect: () => { 
            return {
              top: 111,
              left: 0
            };
          }}
        }
      );
      homeViewWrapper.find('.card-base').first().invoke("onTouchMove")(
        {
          targetTouches: [{
            pageX: 10,
            pageY: 121
          }],
          target: { getBoundingClientRect: () => { 
            return {
              top: 111,
              left: 0
            };
          }}
        }
      );
      homeViewWrapper.find('.card-base').first().invoke("onTouchEnd")();
      expect(homeViewWrapper.find('.card-base').first().props().style).toHaveProperty("top", 121);
      expect(homeViewWrapper.find('.card-base').first().props().style).toHaveProperty("left", 6);
    });
  });


  describe("should not move locked cards when dragged", () => {
    it('by mouse', () => {
      homeViewWrapper.find('.card-base').last().invoke("onMouseDown")(
        {
          nativeEvent: {
            offsetX: 4,
            offsetY: 111
          }
        }
      );
      homeViewWrapper.find('.card-base').last().invoke("onMouseMove")(
        {
          nativeEvent: {
            offsetX: 10,
            offsetY: 121
          }
        }
      );
      homeViewWrapper.find('.card-base').last().invoke("onMouseUp")();
      expect(homeViewWrapper.find('.card-base').last().props().style).toHaveProperty("top", 110);
      expect(homeViewWrapper.find('.card-base').last().props().style).toHaveProperty("left", 0);
    });

    it('by touch', () => {
      homeViewWrapper.find('.card-base').last().invoke("onTouchStart")(
        {
          targetTouches: [{
            pageX: 4,
            pageY: 111
          }],
          target: { getBoundingClientRect: () => { 
            return {
              top: 111,
              left: 0
            };
          }}
        }
      );
      homeViewWrapper.find('.card-base').last().invoke("onTouchMove")(
        {
          targetTouches: [{
            pageX: 10,
            pageY: 121
          }],
          target: { getBoundingClientRect: () => { 
            return {
              top: 111,
              left: 0
            };
          }}
        }
      );
      homeViewWrapper.find('.card-base').last().invoke("onTouchEnd")();
      expect(homeViewWrapper.find('.card-base').last().props().style).toHaveProperty("top", 110);
      expect(homeViewWrapper.find('.card-base').last().props().style).toHaveProperty("left", 0);
    });
  });
});