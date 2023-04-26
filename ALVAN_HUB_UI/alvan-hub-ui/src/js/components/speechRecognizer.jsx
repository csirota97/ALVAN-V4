import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import serviceFactory from '../utils/service-factory';

const SpeechRecognition = window.SpeechRecognition
  || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();
mic.interimResults = false;
mic.continuous = true;
mic.timeout = 10000;
mic.lang = 'en-US';

const activatedSound = new Howl({ src: '../../resources/sounds/confirm1.wav' });

Howler.volume(0.5);

function SpeechRecognizer(props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activated, setActivated] = useState(false);
  const [wasActivated, setWasActivated] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (transcript.includes('Alvin') && !activated) {
      setActivated(true);
      activatedSound.play();
    } else if (activated && transcript !== '') {
      // query api
      serviceFactory.sendQuery(transcript, props.userId, mic, setResponse, props.callbackFunctions);
      setActivated(false);
    }
    mic.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  useEffect(() => {
    // eslint-disable-next-line compat/compat
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';

    if (activated && !wasActivated) {
      setWasActivated(true);
      oscillator.frequency.value = 800;
      oscillator.connect(context.destination);
      oscillator.start();
      // Beep for 500 milliseconds
      setTimeout(() => {
        oscillator.stop();
      }, 100);
    } else if (!activated && wasActivated) {
      setWasActivated(false);
      oscillator.frequency.value = 1200;
      oscillator.connect(context.destination);
      oscillator.start();
      // Beep for 500 milliseconds
      setTimeout(() => {
        oscillator.stop();
      }, 100);
    }
  }, [activated, wasActivated, setWasActivated]);

  useEffect(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
      };
    }
    mic.onstart = () => {
    };

    mic.onresult = (event) => {
      const resultsArray = Array.from(event.results);
      setTranscript(resultsArray
        .map((result) => result[0])
        .map((result) => result.transcript)[resultsArray.length - 1]);
    };
  }, [isListening]);

  if (!isListening) {
    setIsListening(true);
  }
  return (
    !props.hidden
      ? (
        <div className="recognizer">
          {isListening ? <span>on</span> : <span>off</span>}
          <p id="transcript">
            Transcript:
            {' '}
            {transcript}
          </p>
          <p id="response">
            Response:
            {' '}
            {response.tts_cd}
          </p>
        </div>
      )
      : null
  );
}

export default SpeechRecognizer;
