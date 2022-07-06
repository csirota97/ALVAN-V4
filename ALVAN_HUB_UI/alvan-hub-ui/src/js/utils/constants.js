const constants = {
  LISTENER_MIC_TIMEOUT: 10000,
  LISTENER_MIC_LANG: 'en-US',
  ALVAN_MIC_TIMEOUT: 5000,
  CLIENT_ID: "470610043829-bgkch081ikasle3kkitqb1oi6f384b95.apps.googleusercontent.com",
};

const prod = {
  SERVER_URL: 'https://server.ALVANPROJECT.com/',
};

const dev = {
  SERVER_URL: 'http://localhost:5000/',
};

const getConstants = () => {
  const config = ['development', 'test'].includes(process.env.NODE_ENV) ? dev : prod;
  Object.assign(constants, constants, config);
  return constants;
};

export default getConstants;