import 'babel-polyfill';
const dev = true;

const URL_DEV = "http://localhost:5000";
const url = dev ? URL_DEV : '';
const serviceFactory = {
  sendQuery: async (query) => {
    const formData = new FormData();
    formData.append('query', query);
    const response = await fetch(url+"/alvan/api/query", {
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
    console.log(responseString());
  },
};

export default serviceFactory;