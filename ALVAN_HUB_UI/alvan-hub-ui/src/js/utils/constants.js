const constants = {
  LISTENER_MIC_TIMEOUT: 10000,
  LISTENER_MIC_LANG: 'en-US',
  ALVAN_MIC_TIMEOUT: 5000,
  CLIENT_ID: '470610043829-bgkch081ikasle3kkitqb1oi6f384b95.apps.googleusercontent.com',
  TODO_REQUEST: {
    GET_LIST_EVENTS: 0,
    NEW_LIST: 1,
    DELETE_LIST: 2,
    GET_LISTS: 3,
    NEW_EVENT: 4,
    DELETE_EVENT: 5,
    GET_EVENTS: 6,
    UPDATE_EVENT: 7,
    EVENT_SET_IN_PROGRESS: 8,
  },
  SALT: '!fpPJ9f*d2)',
};

const prod = {
  SERVER_URL: 'https://server.ALVANPROJECT.com/',
  CALENDAR_URL: 'http://localhost:3001/',
};

const dev = {
  SERVER_URL: 'http://localhost:5000/',
  CALENDAR_URL: 'http://localhost:3001/',
};

const getConstants = () => {
  const config = ['development', 'test'].includes(process.env.NODE_ENV) ? dev : prod;
  Object.assign(constants, constants, config);
  return constants;
};

export default getConstants;
