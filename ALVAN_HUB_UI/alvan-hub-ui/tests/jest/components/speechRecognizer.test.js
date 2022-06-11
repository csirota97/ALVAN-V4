import 'jsdom-global/register';
import React from "react";
import SpeechRecognizer from '../../../src/js/components/speechRecognizer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure, EnzymeAdapter } from "enzyme";

configure({adapter: new Adapter()});

describe('Speech Recognizer', () => {
  it("should render a speech recognizer", ()=>{
//     const speechRecognizer = mount(<SpeechRecognizer/>);
//     expect(true).toBe(true);
  })
});