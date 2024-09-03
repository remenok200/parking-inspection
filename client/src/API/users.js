import httpClient from './httpClient';

export const getAllUsers = async () => httpClient.get('/users/all');

export const getAllBannedUsers = async () =>
  httpClient.get('/users/all/banned');

export const banUser = async (userId, reason) =>
  httpClient.post('/users/banlist', { userId, reason });

export const unbanUser = async (userId) =>
  httpClient.delete(`/users/banlist/unban/${userId}`);

export const getUserSessions = async (userId) =>
  httpClient.get(`/users/tokens/${userId}`);

export const endSession = async (tokenId) =>
  httpClient.put(`/users/tokens/${tokenId}/revoke`);

export const getAllLogs = async () => httpClient.get('/users/logs/all');

export const getAllLogsByUserID = async (userId) =>
  httpClient.get(`/users/logs/${userId}/all`);

export const makeAdmin = async (userId) =>
  httpClient.put(`/users/admins/${userId}`);

export const removeAdmin = async (userId) =>
  httpClient.delete(`/users/admins/${userId}`);
