import serviceFactory from "./service-factory";

const speak = (message) => {
  try {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
  } catch {
    console.log(`READ_OUT_THE_FOLLOWING:${message}`);
  }
}

const commands = {
  /**
   * default
   */
  '-1': {function: async () => {console.log('oopsies')}},
  /**
   * abilities
   */
  1: {
    description: 'tell you my abilities',
    function: async () => {
      const keys = Object.keys(commands).filter(key => key !== '-1');
      let commandsDescriptionString = "";
      keys.forEach((key, index) => {
        commandsDescriptionString = commandsDescriptionString.concat(index !== keys.length-1 ? 
          `, ${commands[key].description}`: `, or ${commands[key].description}.`);
      });
      speak(`I can ${commandsDescriptionString}`);
    }
  },
  /**
   * time
   */
  2: {
    description: 'tell you the time',
    function: async () => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const isAm = hours < 12 && minutes !== 0;
      const readHours = hours % 12 > 0 ? hours % 12 : 12;
      const readMinutes = minutes >= 10 ? `${minutes}` : minutes === 0 ? '' : `Oh ${minutes}`;
      const amPm = isAm ? 'AM' : 'PM';
      console.log(hours);
      console.log(minutes);
      console.log(isAm);

      speak(`It's currently ${readHours} ${readMinutes} ${amPm}`);
    }
  },
  /**
   * date
   */
  3: {
    description: 'tell you the date',
    function: async () => {
      speak(`Today is ${new Date().toDateString()}`);
    }
  },
  /**
   * lights on
   */
  4: {
    description: 'turn on the lights',
    function: async () => {
      speak('Turning on lights');
      await fetch("https://maker.ifttt.com/trigger/bedroom_lights_on/with/key/dhl8zRZHBF8v8n_HgpJi1E", {
        method: "get",
      });
    }
  },
  /**
   * lights off
   */
  5: {
    description: 'turn off the lights',
    function: async () => {
      speak('Turning off lights');
      await fetch("https://maker.ifttt.com/trigger/bedroom_lights_off/with/key/dhl8zRZHBF8v8n_HgpJi1E", {
        method: "get",
      })
    },
  },
  /**
   * temperature
   */
  6: {
    description: 'tell you the temperature',
    function: async (named_entities) => {
      let weatherData = {};
      const setWeatherData = (data) => {
        weatherData = data;
      };

      if (named_entities && named_entities.GEO) {
        // const setWeatherData = (data) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(JSON.stringify(data)));
        await serviceFactory.weatherRequest(named_entities.GEO, setWeatherData);
      } else {
        await serviceFactory.weatherRequest('philadelphia', setWeatherData);
      }
      const resultSpeech = `It's currently ${weatherData.current.temp_f} degrees ${named_entities?.GEO ? `in ${weatherData.location.name}` : ''}`;
      speak(resultSpeech);
    },
  },
  /**
   * joke
   */
  7: {
    description: 'tell you a joke',
    function: async () => {
      const readJoke = (data) => {
        speak(data.joke);
      };
      await serviceFactory.jokeRequest(readJoke);
    },
  },
};

export default commands;