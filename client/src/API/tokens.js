import httpClient from './httpClient';
import { getIPFromAmazon } from '../utils/getIPFromAmazon';
import { getBrowserAndOSInfo } from '../utils/getBrowserAndOSInfo';

export const authUser = async () => httpClient.get('/users');

let geolocation;
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    geolocation = `${latitude} ${longitude}`;
  }
);

export const refreshUser = async () => {
  const ipAddress = await getIPFromAmazon();
  const { operatingSystem, browser } = await getBrowserAndOSInfo();

  const refreshToken = localStorage.getItem('refreshToken');

  const { data } = await httpClient.post('/users/refresh', {
    refreshToken,
    geolocation,
    ipAddress,
    operatingSystem,
    browser,
  });

  return data;
};
