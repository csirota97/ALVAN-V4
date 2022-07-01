import 'babel-polyfill';
import commands from './commands';
import getConstants from './constants';

const url = getConstants().SERVER_URL;

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
    commands[jsonRes.tts_cd]();
  },

  calendarRequest: async () => {
    const response = await fetch(url+"alvan/api/calendar", {
      method: "get",
    }).then(response => response.json());

    const responseString = async () => {
      response.then((a) => {
        console.log(a);
        return a;
      });
    };

    return responseString()
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
      navigator.geolocation.getCurrentPosition(
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