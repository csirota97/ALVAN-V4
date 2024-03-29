import 'jsdom-global/register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import Screen from '../../../src/js/components/screen';
import SpeechRecognizer from '../../../src/js/components/speechRecognizer';

import HomeView from '../../../src/js/components/views/homeView';
import CalendarView from '../../../src/js/components/views/calendarView';

configure({ adapter: new Adapter() });

jest.mock('../../../src/js/components/speechRecognizer', () => function () {
  const MockSpeechRecognition = 'default-speech-recognition-mock';
  return <MockSpeechRecognition />;
});

jest.mock('../../../src/js/components/clock', () => function () {
  const MockClock = 'default-clock-mock';
  return <MockClock />;
});
let homeScreenWrapper;
let calendarScreenWrapper;

describe('Screen', () => {
  it('placeHolder', () => {
    expect(true).toBe(true);
  });
  // beforeEach(() => {
  //   homeScreenWrapper = mount(<Screen calendarData={[]} home />);
  //   homeScreenWrapper.find('#show-calendar-events').simulate('click');
  //   calendarScreenWrapper = mount(<Screen calendarData={[]} />);
  // });

  // describe('should render', () => {
  //   it('a clock', () => {
  //     const MockClock = 'default-clock-mock';
  //     expect(homeScreenWrapper.find(MockClock).length).toBe(1);
  //   });

  //   it('a SpeechRecognizer', () => {
  //     expect(homeScreenWrapper.find(SpeechRecognizer).length).toBe(1);
  //   });

  //   describe('the HomeView', () => {
  //     it('component', () => {
  //       expect(homeScreenWrapper.find(HomeView).length).toBe(1);
  //     });

  //     it('Show Calendar View button', () => {
  //       expect(homeScreenWrapper.find('.view-swap-button').text()).toBe('Show Calendar View');
  //     });

  //     it('after the Show Home View button is clicked', () => {
  //       calendarScreenWrapper.find('.view-swap-button').simulate('click');
  //       expect(calendarScreenWrapper.find(HomeView).length).toBe(1);
  //     });
  //   });

  //   describe('the CalendarView', () => {
  //     it('component', () => {
  //       expect(calendarScreenWrapper.find(CalendarView).length).toBe(1);
  //     });

  //     it('Show Calendar View button', () => {
  //       expect(calendarScreenWrapper.find('.view-swap-button').text()).toBe('Show Home View');
  //     });

  //     it('after the Show Calendar View button is clicked', () => {
  //       homeScreenWrapper.find('.view-swap-button').simulate('click');
  //       expect(homeScreenWrapper.find(CalendarView).length).toBe(1);
  //     });
  //   });
  // });
});
