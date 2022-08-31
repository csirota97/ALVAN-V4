import React, {useState, useEffect} from 'react';
import { Howl, Howler } from 'howler';
import serviceFactory from '../utils/service-factory';

const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition;
console.log(window.SpeechRecognition);
console.log(window.webkitSpeechRecognition);

const mic = new SpeechRecognition();
mic.interimResults = true;
mic.timeout = 10000;
mic.lang = 'en-US';

const activatedSound = new Howl({src: '../../resources/sounds/confirm1.wav'});

Howler.volume(0.5);

function SpeechRecognizer (props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activated, setActivated] = useState(false);
  const [wasActivated, setWasActivated] = useState(false);
  const [response, setResponse] = useState({});

  mic.onspeechend = (e) => {
    // console.log(e);
    if (transcript.includes('Alvin') && !activated) {
      setActivated(true);
      activatedSound.play();
      // console.log("blip"); 
    } else if (activated && transcript !== "") {
      //query api
      console.log("Query: " + transcript);
      serviceFactory.sendQuery(transcript, setResponse);
      
      setActivated(false);  
    }
    mic.stop();
    // console.log("RESTART");
  }

  useEffect(() => {
    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";

    if (activated && !wasActivated) {
      setWasActivated(true);
      oscillator.frequency.value = 800;
      oscillator.connect(context.destination);
      oscillator.start(); 
      // Beep for 500 milliseconds
      setTimeout(function () {
          oscillator.stop();
      }, 100);      
    
    }
    else if (!activated && wasActivated) {
      setWasActivated(false);
      oscillator.frequency.value = 1200;
      oscillator.connect(context.destination);
      oscillator.start(); 
      // Beep for 500 milliseconds
      setTimeout(function () {
          oscillator.stop();
      }, 100);  
    }
  }, [activated, wasActivated, setWasActivated])

  useEffect(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        // console.log('continue');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        // console.log('stopped');
      };
    }
    mic.onstart = () => {
      // console.log('mic on');
    };
    mic.onresult = (event) => {
      // console.log(Array.from(event.results)
      //     .map((result) => result[0])
      //     .map((result) => result.transcript)
      //     .join(''));
      // console.log(event);
      setTranscript(Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join(''));
      // mic.onerror = (event) => console.log(event.error);
      
    };
  }, [isListening]);

  if(!isListening) {
    setIsListening(true);
  }
  return (
    <>
      <div className='recognizer'>
        {isListening ? <span>on</span> : <span>off</span>}
        <p id='transcript'>
          Transcript: {transcript}
        </p>
        <p id='response'>
          Response: {response.tts_cd}
        </p>
        <button onClick={() => {console.log(serviceFactory.calendarRequest(props.googleUser));}} />
      </div>
    </>
  );
};

export default SpeechRecognizer;