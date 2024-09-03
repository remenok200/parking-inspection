import httpClient from './httpClient';

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

export const getAllLogs = async () => await httpClient.get('/users/logs/all');

export const getAllLogsByUserID = async (userId) =>
  await httpClient.get(`/users/logs/${userId}/all`);

export const makeAdmin = async (userId) =>
  await httpClient.put(`/users/admins/${userId}`);

export const removeAdmin = async (userId) =>
  await httpClient.delete(`/users/admins/${userId}`);
