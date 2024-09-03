import httpClient from './httpClient';
import history from '../BrowserHistory';
import { getIPFromAmazon } from '../utils/getIPFromAmazon';
import { getBrowserAndOSInfo } from '../utils/getBrowserAndOSInfo';

let geolocation;
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    geolocation = `${latitude} ${longitude}`;
  }
);

export const loginUser = async (userData) => {
  const ipAddress = await getIPFromAmazon();
  const { operatingSystem, browser } = getBrowserAndOSInfo();

  const response = await httpClient.post('/users/sign-in', {
    ...userData,
    geolocation,
    ipAddress,
    operatingSystem,
    browser,
  });

  if (response.status === 200) {
    history.push('/officers');
  }
};

export const registerUser = async (userData) => {
  const ipAddress = await getIPFromAmazon();
  const { operatingSystem, browser } = getBrowserAndOSInfo();

  const response = await httpClient.post('/users/sign-up', {
    ...userData,
    geolocation,
    ipAddress,
    operatingSystem,
    browser,
  });

  if (response.status === 201) {
    history.push('/officers');
  }
};

export const logout = async (tokenId) =>
  await httpClient.delete(`/users/logout/${tokenId}`);
