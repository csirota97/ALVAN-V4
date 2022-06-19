import 'jsdom-global/register';
import React from "react";
import { act } from 'react-dom/test-utils';
import Screen from '../../../src/js/components/screen';
import Card from "../../../src/js/components/card";
import SpeechRecognizer from '../../../src/js/components/speechRecognizer';
import Clock from '../../../src/js/components/clock';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import mockCalendarCall from '../../../src/js/utils/mockCalendarCalls';

import { configure, mount, shallow } from "enzyme";
import { uniqueNamesGenerator, names } from 'unique-names-generator';

configure({adapter: new Adapter()});

jest.mock("../../../src/js/components/speechRecognizer", () => () => {
  const MockSpeechRecognition = "default-speech-recognition-mock";
  return <MockSpeechRecognition />;
});

jest.mock("../../../src/js/components/clock", () => () => {
  const MockClock = "default-clock-mock";
  return <MockClock />;
});
let screenWrapper;

describe("Screen", () => {
  beforeEach(() => {
    act(() => {
    screenWrapper = mount(<Screen calendarData={mockCalendarCall}/>);
    });
  });

  describe("should render", () => {
    it('a clock', () => {
      const MockClock = "default-clock-mock";
      expect(screenWrapper.find(MockClock).length).toBe(1);
    })
    it('a SpeechRecognizer', () => {
      expect(screenWrapper.find(SpeechRecognizer).length).toBe(1);
    })
    it('calendar event cards', () => {
      expect(screenWrapper.find('.calendar-card').length).toBe(5);
    })
    it('a weather card', () => {
      expect(screenWrapper.find('.weather-card').length).toBe(1);
    })
  });

  describe("should move cards when dragged", () => {
    it('by mouse', () => {
      screenWrapper.find('.card-base').first().invoke("onMouseDown")(
        {
          nativeEvent: {
            offsetX: 4,
            offsetY: 111
          }
        }
      );
      screenWrapper.find('.card-base').first().invoke("onMouseMove")(
        {
          nativeEvent: {
            offsetX: 10,
            offsetY: 121
          }
        }
      );
      screenWrapper.find('.card-base').first().invoke("onMouseUp")();
      expect(screenWrapper.find('.card-base').first().props().style).toHaveProperty("top", 121);
      expect(screenWrapper.find('.card-base').first().props().style).toHaveProperty("left", 6);
    });

    it("cards should move to front when selected", () => {
      screenWrapper.find('.card-base').at(2).invoke("onMouseDown")(
        {
          nativeEvent: {
            offsetX: 4,
            offsetY: 111
          }
        }
      )
      screenWrapper.find('.card-base').at(2).invoke("onMouseMove")(
        {
          nativeEvent: {
            offsetX: 10,
            offsetY: 121
          }
        }
      );
      screenWrapper.find('.card-base').at(2).invoke("onMouseUp");
      expect(screenWrapper.find(Card).at(2).props().zIndex[2]).toBe(50);
    });

    it('by touch', () => {
      screenWrapper.find('.card-base').first().invoke("onTouchStart")(
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
      screenWrapper.find('.card-base').first().invoke("onTouchMove")(
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
      screenWrapper.find('.card-base').first().invoke("onTouchEnd")();
      expect(screenWrapper.find('.card-base').first().props().style).toHaveProperty("top", 121);
      expect(screenWrapper.find('.card-base').first().props().style).toHaveProperty("left", 6);
    });
  });
});