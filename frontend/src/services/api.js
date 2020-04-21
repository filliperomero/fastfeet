import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg3NDM1NjA3LCJleHAiOjE1ODgwNDA0MDd9.yQzyg0wRR-ipF3igBmoReftp8GP1fyLYGRV9crYZZrY',
  },
});

export default api;
