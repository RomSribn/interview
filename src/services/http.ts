import axios from 'axios';

function parseObject(object: any) {
  Object.entries(object).map(([key, value]) => {
    if (value instanceof Object) {
      object[key] = parseObject(value);
    }
  });
  return object;
}

export const convertParams = (config: any) => {
  if (config.params) {
    config.params = parseObject(config.params);
  }
  return config;
};

const httpClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
});

httpClient.interceptors.request.use((config) => convertParams(config));

export default httpClient;
