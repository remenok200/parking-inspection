import httpClient from './httpClient';

export const getAllProtocols = async (page) => {
  const endpoint = page
    ? `/parkOfficers/protocols?page=${page}`
    : '/parkOfficers/protocols';
  return await httpClient.get(endpoint);
};

export const deleteProtocolByID = async (parkOfficerID, protocolID) =>
  httpClient.delete(`/parkOfficers/${parkOfficerID}/protocols/${protocolID}`);

export const createProtocol = async (parkOfficerID, protocolData) =>
  httpClient.post(`/parkOfficers/${parkOfficerID}/protocols`, protocolData);

export const updateProtocol = async (parkOfficerID, protocolID, updatedData) =>
  httpClient.put(
    `/parkOfficers/${parkOfficerID}/protocols/${protocolID}`,
    updatedData
  );

export const getProtocolById = async (protocolId) =>
  httpClient.get(`/parkOfficers/${null}/protocols/${protocolId}`);

export const getAllProtocolsByOfficerID = async (parkOfficerID, page) => {
  const endpoint = page
    ? `/parkOfficers/${parkOfficerID}/protocols?page=${page}`
    : `/parkOfficers/${parkOfficerID}/protocols`;
  return await httpClient.get(endpoint);
};

export const addProtocolImages = async (images, protocolID) =>
  httpClient.post(`/parkOfficers/protocols/${protocolID}/images`, images);

export const deleteProtocolImageByID = async (protocolID, imageID) =>
  httpClient.delete(`/parkOfficers/protocols/${protocolID}/images/${imageID}`);
