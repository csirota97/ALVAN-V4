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
    const response = await fetch(`${calendar_url}events.json?calendar_id=${calendar_id}`, {
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

  toDoRequest: async (requestType, params, setResponseJson) => {
    let response = {};
    const formData = new FormData();
    const toDoURL = `${url}alvan/api/todo`
    switch(requestType) {
      case CONSTANTS.TODO_REQUEST.GET_LIST_EVENTS:
        // console.log(formData)
        response = await fetch(`${toDoURL}/lists/-1`, {
          method: "GET",
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.NEW_LIST:
        formData.append('ownerId', params.ownerId);
        formData.append('calendarId', params.calendarId);
        formData.append('listName', params.listName);
        // console.log(formData)
        response = await fetch(`${toDoURL}/list`, {
          method: "POST",
          body: formData,
        });
        break;
      case CONSTANTS.TODO_REQUEST.DELETE_LIST:
        // code block
        break;
      case CONSTANTS.TODO_REQUEST.GET_LISTS:
        // console.log(formData)
        response = await fetch(`${toDoURL}/lists/-1`, {
          method: "GET",
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.DELETE_LIST:
      case CONSTANTS.TODO_REQUEST.NEW_EVENT:
        formData.append('listId', params.listId);
        formData.append('description', params.description);
        formData.append('completed', false);
        response = await fetch(`${toDoURL}/event`, {
          method: "POST",
          body: formData,
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.DELETE_EVENT:
        break;
      case CONSTANTS.TODO_REQUEST.GET_EVENTS:
        response = await fetch(`${toDoURL}/events/${params.listId}`, {
          method: "GET",
          headers: {'Content-Type': 'application/json', 'mode': 'no-cors'},
        });
        return response;
      case CONSTANTS.TODO_REQUEST.UPDATE_EVENT:
        response = await fetch(`${toDoURL}/event/${params.eventId}`, {
          method: "PUT",
          body: JSON.stringify({ completed: params.completed }),
          headers: {'Content-Type': 'application/json', 'mode': 'no-cors'},
        });
        break;
      default:
        // code block
        break;
    };

    const resJson = await response.json();
    // console.log(resJson)
    setResponseJson(resJson);
  },
};

export default serviceFactory;