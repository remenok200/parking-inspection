import axios from 'axios';
import history from '../BrowserHistory';
import { getIPFromAmazon } from '../utils/getIPFromAmazon';
import { getBrowserAndOSInfo } from '../utils/getBrowserAndOSInfo';

const httpClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const getParkOfficers = async () =>
  await httpClient.get('/parkOfficers');

export const deleteParkOfficer = async (parkOfficerID) =>
  await httpClient.delete(`/parkOfficers/${parkOfficerID}`);

export const dismissParkOfficer = async (parkOfficerID) =>
  await httpClient.put(`/parkOfficers/${parkOfficerID}/dismiss`);

export const restoreParkOfficer = async (parkOfficerID) =>
  await httpClient.put(`/parkOfficers/${parkOfficerID}/restore`);

export const addParkOfficer = async (parkOfficer) =>
  await httpClient.post('/parkOfficers', parkOfficer);

export const updateParkOfficer = async (parkOfficerID, updatedData) =>
  await httpClient.put(`/parkOfficers/${parkOfficerID}`, updatedData);

export const getAllProtocols = async (page) => {
  if (page) {
    return await httpClient.get(`/parkOfficers/protocols?page=${page}`);
  } else {
    return await httpClient.get(`/parkOfficers/protocols`);
  }
};

export const deleteProtocolByID = async (parkOfficerID, protocolID) =>
  await httpClient.delete(
    `/parkOfficers/${parkOfficerID}/protocols/${protocolID}`
  );

export const createProtocol = async (parkOfficerID, protocolData) =>
  await httpClient.post(
    `/parkOfficers/${parkOfficerID}/protocols`,
    protocolData
  );

export const updateProtocol = async (parkOfficerID, protocolID, updatedData) =>
  await httpClient.put(
    `/parkOfficers/${parkOfficerID}/protocols/${protocolID}`,
    updatedData
  );

export const getAllProtocolsByOfficerID = async (parkOfficerID, page) => {
  if (page) {
    return await httpClient.get(
      `/parkOfficers/${parkOfficerID}/protocols?page=${page}`
    );
  } else {
    return await httpClient.get(`/parkOfficers/${parkOfficerID}/protocols`);
  }
};

export const addProtocolImages = async (images, protocolID) => {
  await httpClient.post(`/parkOfficers/protocols/${protocolID}/images`, images);
};

export const deleteProtocolImageByID = async (protocolID, imageID) =>
  await httpClient.delete(
    `/parkOfficers/protocols/${protocolID}/images/${imageID}`
  );

// AUTH

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

// ADMIN

export const getAllUsers = async () => await httpClient.get('/users/all');

export const getAllBannedUsers = async () =>
  await httpClient.get('/users/all/banned');

export const banUser = async (userId, reason) =>
  await httpClient.post('/users/banlist', { userId, reason });

export const unbanUser = async (userId) =>
  await httpClient.delete(`/users/banlist/unban/${userId}`);

export const getUserSessions = async (userId) =>
  await httpClient.get(`/users/tokens/${userId}`);

export const endSession = async (tokenId) =>
  await httpClient.put(`/users/tokens/${tokenId}/revoke`);

// TOKENS

export const authUser = async () => await httpClient.get('/users');

export const refreshUser = async () => {
  const ipAddress = await getIPFromAmazon();
  const { operatingSystem, browser } = getBrowserAndOSInfo();

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

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    const {
      data: { tokens },
    } = response;

    if (tokens) {
      const { accessToken, refreshToken } = tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
  },
  async (err) => {
    const {
      response: { status },
      config,
    } = err;

    if (status === 403 && localStorage.getItem('refreshToken')) {
      await refreshUser();

      return await httpClient(config);
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
