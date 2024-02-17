import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.236.186/api',
});

export default api;
