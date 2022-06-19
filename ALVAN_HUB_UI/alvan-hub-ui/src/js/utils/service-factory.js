import 'babel-polyfill';
import getConstants from './constants';

const url = getConstants().SERVER_URL;

const serviceFactory = {
  sendQuery: async (query) => {
    const formData = new FormData();
    formData.append('query', query);
    const response = await fetch(url+"alvan/api/query", {
      method: "POST",
      mode: 'cors',
      body: formData,
    }).then(response => response.json());
  
    const responseString = async () => {
      response.then((a) => {
        console.log(a);
        return a;
      });
    };

    return responseString()
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
    const response = await fetch(url+`alvan/api/weather/${location}`, {
      method: "get",
    });
    const resJson = await response.json();
    setResponseJson(resJson);
  },
};

export default serviceFactory;