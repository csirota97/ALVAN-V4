import React, { useState, useEffect } from 'react';
import './card.scss';
import '../../index.scss';
import Card from './card';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';
import Clock from './clock';
import {SpeechRecognizer} from './speechRecognizer.js';
import mockCalendarCall from '../utils/mockCalendarCalls.js'

/**
 * @return {Component} screen component
 */
export default function Screen() {
  const [calendarState, setCalendarState] = useState([]);

  useEffect(() => console.log(calendarState));

  return (
    <>
      <Clock />
      {/* <Card name='Card1' lockedWidth>
        Test card
      </Card>
      <Card name='Card2' lockedWidth>
        Test card 2
      </Card>
      <Card name='Card5' lockedWidth>
        Test card 3 Testasdasgsga card 3 Test card 3
      </Card> */}
      {calendarState.map((event, i) =>
        <Card name={event.summary.substring(0, 30)} lockedWidth posY={i*50 + 1} >
          {event.organizer.displayName}
          <hr />
          {event.start.date}
          <br />
          {event.end.date}
        </Card>
      )}

      <button onClick={() => {setCalendarState(mockCalendarCall.items);}} />
      <img className='logo' src={logo}></img>
      <img className='logo-back' src={logo2}></img>
      <SpeechRecognizer></SpeechRecognizer>
    </>
  );
};
