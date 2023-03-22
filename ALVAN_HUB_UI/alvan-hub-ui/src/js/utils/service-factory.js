import 'babel-polyfill';
import commands from './commands';
import getConstants from './constants';
import hash from 'hash.js';
import { internalIpV4, internalIpV4Sync } from 'internal-ip';

const CONSTANTS = getConstants();

const url = CONSTANTS.SERVER_URL;
const calendar_url = CONSTANTS.CALENDAR_URL;

const serviceFactory = {
  sendQuery: async (query, userId, mic, setResponseJson) => {
    const formData = new FormData();
    formData.append('query', query);
    const response = await fetch(url+"alvan/api/query", {
      method: "POST",
      mode: 'cors',
      body: formData,
    });
    const jsonRes = await response.json();
    setResponseJson(jsonRes);
    commands[jsonRes.tts_cd].function(jsonRes.named_entities, userId, query, mic);
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
        response = await fetch(`${toDoURL}/lists/${params.id}`, {
          method: "GET",
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.NEW_LIST:
        formData.append('ownerId', params.ownerId);
        formData.append('calendarId', params.calendarId);
        formData.append('listName', params.listName);
        response = await fetch(`${toDoURL}/list`, {
          method: "POST",
          body: formData,
        });
        break;
      case CONSTANTS.TODO_REQUEST.DELETE_LIST:
        response = await fetch(`${toDoURL}/list/${params.listId}`, {
          method: "delete",
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.GET_LISTS:
        response = await fetch(`${toDoURL}/lists/-1`, {
          method: "GET",
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.NEW_EVENT:
        formData.append('listId', params.listId);
        formData.append('description', params.description);
        formData.append('completed', false);
        formData.append('repeatUnit', params.repeatUnit);
        formData.append('repeatInterval', params.repeatInterval);
        formData.append('repeatStartDate', params.repeatStartDate);
        response = await fetch(`${toDoURL}/event`, {
          method: "POST",
          body: formData,
          headers: {'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.DELETE_EVENT:
        response = await fetch(`${toDoURL}/event/${params.eventId}`, {
          method: "delete",
          body: formData,
          headers: {'mode': 'no-cors'},
        });
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
          body: JSON.stringify({ completed: params.completed, inProgress: false }),
          headers: {'Content-Type': 'application/json', 'mode': 'no-cors'},
        });
        break;
      case CONSTANTS.TODO_REQUEST.EVENT_SET_IN_PROGRESS:
        response = await fetch(`${toDoURL}/event/${params.eventId}`, {
          method: "PUT",
          body: JSON.stringify({ completed: false, inProgress: true }),
          headers: {'Content-Type': 'application/json', 'mode': 'no-cors'},
        });
        break;
      default:
        // code block
        break;
    };
    const resJson = await response.json();
    setResponseJson(resJson);
  },

  createUser: async (firstName, lastName, email, password, setResponseJson) => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('passwordHash', hash.sha256().update(password+CONSTANTS.SALT).digest('hex'));
    return await fetch(url+"alvan/api/auth/newUser", {
      method: "POST",
      mode: 'cors',
      body: formData,
    }).then(async res => res.json()).catch(e => console.error(e));
    // let resJson = response;
    
  },

  findUser: async (email, password, setResponseJson) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('passwordHash', hash.sha256().update(password+CONSTANTS.SALT).digest('hex'));
    return await fetch(url+"alvan/api/auth/login", {
      method: "POST",
      mode: 'cors',
      body: formData,
    }).then(async res => res.json()).catch(e => console.error(e));
    // let resJson = response;
    
  },

  registerToDoDevice:  async (ownerId, deviceToken, handleJsonResponse) => {
    const formData = new FormData();
    formData.append('deviceToken', deviceToken);
    const response = await fetch(url+"alvan/api/todo/RegisterToDo/"+ownerId, {
      method: "POST",
      mode: 'cors',
      body: formData,
    }).catch(e => console.error(e));
    const jsonRes = await response.json();
    handleJsonResponse(jsonRes);
  },

  jokeRequest: async (handleJsonResponse) => {
    const headers = new Headers({'accept': 'application/json'});
    const response = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: headers,
    });
    const jsonRes = await response.json();
    handleJsonResponse(jsonRes);
  },

  newReminderRequest:  async (ownerId, reminderString, query) => {
    const formData = new FormData();
    formData.append('reminder', reminderString);
    formData.append('query', query);
    return await fetch(url+"alvan/api/reminder/"+ownerId, {
      method: "POST",
      mode: 'cors',
      body: formData,
    }).then(async res => res.json()).catch(e => console.error(e));
  },

  getRemindersRequest:  async (ownerId, handleJsonResponse) => {
    const response = await fetch(url+"alvan/api/reminder/"+ownerId, {
      method: "GET",
      mode: 'cors',
    }).catch(e => console.error(e));
    const jsonRes = await response.json();
    handleJsonResponse(jsonRes);
  },
    
  getRemindersWithOffsetRequest:  async (ownerId, offset, handleJsonResponse) => {
    const response = await fetch(url+"alvan/api/reminder/"+ownerId+"/"+offset, {
      method: "GET",
      mode: 'cors',
    }).catch(e => console.error(e));
    const jsonRes = await response.json();
    handleJsonResponse(jsonRes);
  },

  securityCameraNetworkScan: async (index, homeId) => {
    const privateIP = await internalIpV4() || '192.168.1.155';
    const privateIPStem = privateIP.split('.').splice(0,3).join('.')
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    let response = await fetch(`http://${privateIPStem}.${index}:5001/networkScan/${homeId}`, {
      method: "GET",
      mode: 'cors',
      signal: controller.signal
    }).then(res=> res.json()).then(res => {return {url:`http://${privateIPStem}.${index}:5001`, deviceId: res.deviceKey, status: res.status}})
    clearTimeout(id);

    return {status: response.status, url:response.url.split('/network')[0], deviceId: response.deviceId}
  },

  registerDevice: async (homeId, deviceId, deviceType) => {
    const formData = new FormData();
    formData.append('homeId', homeId);
    formData.append('deviceId', deviceId);
    formData.append('deviceType', deviceType);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    let status = 0;
    let response = await fetch(`${url}/device`, {
      method: "POST",
      mode: 'cors',
      signal: controller.signal,
      body: formData
    }).then(res=>{status=res.status; return res.json()}).then(res => {return {response:res, url, status}})
    clearTimeout(id);

    return {status: response.response.status, url:url, body: response.response}
  },

  setSecurityCameraRegistration: async (url,homeId) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    let status = 0;
    let response = await fetch(`${url}/register/${homeId}`, {
      method: "GET",
      mode: 'cors',
      signal: controller.signal
    }).then(res=>{status=res.status; return res.json()}).then(res => {return {response:res, url, status}})
    clearTimeout(id);

    return {status: response.response.status, url:url, body: response.response}
  }
    
};

export default serviceFactory;