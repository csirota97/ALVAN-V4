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
  '-1': async () => {console.log('oopsies')},
  /**
   * time
   */
  1: async () => {
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
  },
  /**
   * date
   */
  2: async () => {
    speak(`Today is ${new Date().toDateString()}`);
  },
  /**
   * lights on
   */
  3: async () => {
    
    speak('Turning on lights');
    await fetch("https://maker.ifttt.com/trigger/bedroom_lights_on/with/key/dhl8zRZHBF8v8n_HgpJi1E", {
      method: "get",
    });
  },
  /**
   * lights off
   */
  4: async () => {
    speak('Turning off lights');
    await fetch("https://maker.ifttt.com/trigger/bedroom_lights_off/with/key/dhl8zRZHBF8v8n_HgpJi1E", {
      method: "get",
    })
  },
  /**
   * temperature
   */
  5: async (named_entities) => {
    let weatherData = {};
    const setWeatherData = (data) => {
      console.log(data);
      weatherData = data;
    };

    if (named_entities && named_entities.GEO) {
      // const setWeatherData = (data) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(JSON.stringify(data)));
      await serviceFactory.weatherRequest(named_entities.GEO, setWeatherData);
    } else {
      await serviceFactory.weatherRequest('philadelphia', setWeatherData);
    }
    console.log(weatherData)
    const resultSpeech = `It's currently ${weatherData.current.temp_f} degrees ${named_entities?.GEO ? `in ${weatherData.location.name}` : ''}`;
    speak(resultSpeech);
  },
};

export default commands;