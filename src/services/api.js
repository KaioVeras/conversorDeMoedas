import axios from 'axios';

// https://economia.awesomeapi.com.br/json/
// USD-BRL > dolar para real

const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/',
});

export default api;
