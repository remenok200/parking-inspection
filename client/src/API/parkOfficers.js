import httpClient from './httpClient';

export const getParkOfficers = async () =>
  await httpClient.get('/parkOfficers');

export const getParkOfficerByID = async (parkOfficerID) =>
  await httpClient.get(`/parkOfficers/${parkOfficerID}`);

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
