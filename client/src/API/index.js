import axios from 'axios';

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

export const getAllProtocols = async () =>
  await httpClient.get('/parkOfficers/protocols');

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

export const getAllProtocolsByOfficerID = async (parkOfficerID) =>
  await httpClient.get(`/parkOfficers/${parkOfficerID}/protocols`);

export const addProtocolImages = async (images, protocolID) => {
  await httpClient.post(`/parkOfficers/protocols/${protocolID}/images`, images);
};

export const deleteProtocolImageByID = async (protocolID, imageID) =>
  await httpClient.delete(
    `/parkOfficers/protocols/${protocolID}/images/${imageID}`
  );
