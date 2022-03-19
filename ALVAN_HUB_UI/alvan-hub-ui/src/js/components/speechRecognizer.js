import React, {useState, useEffect} from 'react';
import { Howl, Howler } from 'howler';


const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.interimResults = true;
mic.timeout = 10000;
mic.lang = 'en-US';

const activatedSound = new Howl({src: '../../resources/sounds/confirm1.wav'});

Howler.volume(0.5);

export const SpeechRecognizer = (props) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activated, setActivated] = useState(false);

  mic.onspeechend = (e) => {
    console.log(e);
    if (transcript.includes('Alvin') && !activated) {
      setActivated(true);
      activatedSound.play();
      console.log("blip");
    } else if (activated && transcript !== "") {
      //query api
      console.log("Query: " + transcript);
      setActivated(false);  
    }
    mic.stop();
    console.log("RESTART");
  }

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('stopped');
      };
    }
    mic.onstart = () => {
      console.log('mic on');
    };
    mic.onresult = (event) => {
      console.log(Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join(''));
      console.log(event);
      setTranscript(Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join(''));
      mic.onerror = (event) => console.log(event.error);
      
    };
  };

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
      </div>
    </>
  );
};
