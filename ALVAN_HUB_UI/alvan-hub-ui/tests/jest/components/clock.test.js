import 'jsdom-global/register';
import React from "react";
import { act } from 'react-dom/test-utils';
import Clock from "../../../src/js/components/clock";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from "enzyme";

configure({adapter: new Adapter()});

describe('Clock', () => {
  it("should display the current time", () => {
    let clock;
    let curTime;
    act(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
      curTime = new Date().toLocaleTimeString();
      clock = mount(<Clock/>);
    });
    expect(clock.find('h1').props().children).toEqual(curTime);
  })
});