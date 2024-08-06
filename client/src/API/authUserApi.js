import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api/users',
});

export const loginUser = async (userData) =>
  await httpClient.post('/sign-in', userData);

export const registerUser = async (userData) =>
  await httpClient.post('/sign-up', userData);
