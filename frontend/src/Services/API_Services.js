import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your Node.js server URL
});

export default api;
