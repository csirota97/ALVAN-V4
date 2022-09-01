import 'babel-polyfill';
import commands from './commands';
import getConstants from './constants';

const CONSTANTS = getConstants();

const url = CONSTANTS.SERVER_URL;
const calendar_url = CONSTANTS.CALENDAR_URL;

const serviceFactory = {
  sendQuery: async (query, setResponseJson) => {
    const formData = new FormData();
    formData.append('query', query);
    const response = await fetch(url+"alvan/api/query", {
      method: "POST",
      mode: 'cors',
      body: formData,
    });
    const jsonRes = await response.json();
    setResponseJson(jsonRes);
    console.log(jsonRes);
    commands[jsonRes.tts_cd](jsonRes.named_entities);
  },

  calendarRequest: async (user_id, setResponseJson) => {
    const response = await fetch(`${calendar_url}calendars.json?owner_id=${user_id}`, {
      method: "get",
    });
    const resJson = await response.json();
    setResponseJson(resJson);
  },

  eventRequest: async (calendar_id, setResponseJson) => {
    const response = await fetch(`${calendar_url}events/${calendar_id}.json`, {
      method: "get",
    });
    const resJson = await response.json();
    console.log(resJson)
    setResponseJson(resJson);
  },

  weatherRequest: async (location, setResponseJson) => {
    const options = {
      method: "get",
    };
    const weatherUrl = `${url}alvan/api/weather`
    if (location) {
      const response = await fetch(`${weatherUrl}/${location}`, options);
      const resJson = await response.json();
      setResponseJson(resJson);
    }
    else {
      navigator.geolocation?.getCurrentPosition(
        async (position) => {
          const response = await fetch(`${weatherUrl}/${position.coords.latitude},${position.coords.longitude}`, options);
          const resJson = await response.json();
          setResponseJson(resJson);
        },
        async () => {
          const response = await fetch(`${weatherUrl}/philadelphia`, options);
          const resJson = await response.json();
          setResponseJson(resJson);
        }
      )
    }
  },
};

export default serviceFactory;