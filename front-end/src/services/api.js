import axios from 'axios';

const api = axios.create({
  // baseURL: (`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}`) || 'http://localhost:3001',
  baseURL: (`http://${process.env.REACT_APP_API_URL}`) || 'http://localhost:3001',
  // baseURL: 'https://app-delivery-opal.vercel.app',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);

  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  console.log(endpoint);

  return data;
};

export const requestPut = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);

  return data;
};

export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint);

  return data;
};

export default api;
