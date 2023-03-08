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
    function: async (named_entities, userId, query, mic) => {
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
    function: async (named_entities, userId, query, mic) => {
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
    function: async (named_entities, userId, query, mic) => {
      speak(`Today is ${new Date().toDateString()}`);
    }
  },
  /**
   * lights on
   */
  4: {
    description: 'turn on the lights',
    function: async (named_entities, userId, query, mic) => {
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
    function: async (named_entities, userId, query, mic) => {
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
    function: async (named_entities, userId, query, mic) => {
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
    function: async (named_entities, userId, query, mic) => {
      const readJoke = (data) => {
        speak(data.joke);
      };
      await serviceFactory.jokeRequest(readJoke);
    },
  },
  /**
   * set reminder
   */
  8: {
    description: 'set a reminder',
    function: async (named_entities, userId, query, mic) => {
      console.log(named_entities)
      const onresultOriginal = mic.onresult;
      let message = "";
      const reminderPrompt = "What would you like the reminder to be?";
      if (named_entities.DATE || named_entities.TIME) {
        mic.stop();

        speak(reminderPrompt);
        mic.onresult = (event) => {
          const resultsArray = Array.from(event.results);
          message = (resultsArray
            .map((result) => result[0])
            .map((result) => result.transcript)[resultsArray.length - 1]
          );
          if (message.toLowerCase() !== reminderPrompt.toLowerCase()) {
            speak(message);
            console.log(message)
            mic.onresult=onresultOriginal;
            serviceFactory.newReminderRequest(userId, message, query)
          }
        };
        mic.start();
      }
      else {speak('pen 15')}
      // await serviceFactory.jokeRequest();
    },
  },
  /**
   * get reminders
   */
  9: {
    description: 'list your reminders',
    function: async (named_entities, userId, query, mic) => {
      if(!userId) {
        speak("Please sign in and try again.");
        return;
      }

      serviceFactory.getRemindersRequest(userId, json => {
        if (json.reminders.length === 0) {
          speak("You have no reminders");
        } else {
          speak(`You have ${json.reminders.length} ${json.reminders.length > 1 ? 'reminders' : 'reminder'}.`)
          
          json.reminders.forEach(reminder => {
            const reminderDate = new Date(reminder[3]*1000);
            const days = {
              0: 'Sunday',
              1: 'Monday',
              2: 'Tuesday',
              3: 'Wednesday',
              4: 'Thursday',
              5: 'Friday',
              6: 'Saturday',
            }
            speak(reminder[2] + " on " + days[reminderDate.getDay()] + ' ' + reminderDate.toLocaleDateString() + ' at ' + reminderDate.toLocaleTimeString());
          });
        }
      });
    },
  },
};

export default commands;