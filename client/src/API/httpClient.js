import axios from 'axios';
import history from '../BrowserHistory';
import { refreshUser } from './tokens';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    const { tokens } = response.data;

    if (tokens) {
      const { accessToken, refreshToken } = tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
  },
  async (err) => {
    const { status, config } = err.response;

    if (status === 403 && localStorage.getItem('refreshToken')) {
      await refreshUser();

      return httpClient(config);
    } else if (status === 401) {
      localStorage.clear();
      history.push('/');
    } else {
      history.push('/');
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default httpClient;
