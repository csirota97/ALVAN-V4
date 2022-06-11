import 'jsdom-global/register';
import React from "react";
import Clock from "../../../src/js/components/clock";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, EnzymeAdapter } from "enzyme";

configure({adapter: new Adapter()});

describe('Clock', () => {
  it("should display the current time", ()=>{
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    const clock = mount(<Clock/>);
    expect(clock.find('h1').props().children).toEqual(new Date().toLocaleTimeString());
  })
});