import 'babel-polyfill';
import getConstants from './constants';

const url = getConstants().SERVER_URL;

const serviceFactory = {
  sendQuery: async (query) => {
    const formData = new FormData();
    formData.append('query', query);
    const response = await fetch(url+"/alvan", {
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
    const response = await fetch(url+"/calendar", {
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
};

export default serviceFactory;