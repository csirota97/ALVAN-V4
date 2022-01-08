import React, {useState, useEffect} from 'react';

const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

export const SpeechRecognizer = (props) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

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
      mic.onerror = (event) => console.log(event.error);
    };
  };

  return (
    <>
      <div className='recognizer'>
        {isListening ? <span>on</span> : <span>off</span>}
        <p id='transcript'>
          Transcript: {transcript}
        </p>
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          Start
        </button>
      </div>
    </>
  );
};
