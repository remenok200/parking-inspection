import httpClient from './httpClient';

export const getParkOfficers = async () => httpClient.get('/parkOfficers');

export const deleteParkOfficer = async (parkOfficerID) =>
  httpClient.delete(`/parkOfficers/${parkOfficerID}`);

export const dismissParkOfficer = async (parkOfficerID) =>
  httpClient.put(`/parkOfficers/${parkOfficerID}/dismiss`);

export const restoreParkOfficer = async (parkOfficerID) =>
  httpClient.put(`/parkOfficers/${parkOfficerID}/restore`);

export const addParkOfficer = async (parkOfficer) =>
  httpClient.post('/parkOfficers', parkOfficer);

export const updateParkOfficer = async (parkOfficerID, updatedData) =>
  httpClient.put(`/parkOfficers/${parkOfficerID}`, updatedData);
