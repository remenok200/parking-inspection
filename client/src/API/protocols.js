import httpClient from './httpClient';

export const getAllProtocols = async (page) => {
  const endpoint = page
    ? `/parkOfficers/protocols?page=${page}`
    : '/parkOfficers/protocols';
  return await httpClient.get(endpoint);
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

export const getProtocolById = async (protocolId) =>
  await httpClient.get(`/parkOfficers/${null}/protocols/${protocolId}`);

export const getAllProtocolsByOfficerID = async (parkOfficerID, page) => {
  const endpoint = page
    ? `/parkOfficers/${parkOfficerID}/protocols?page=${page}`
    : `/parkOfficers/${parkOfficerID}/protocols`;
  return await httpClient.get(endpoint);
};

export const addProtocolImages = async (images, protocolID) =>
  await httpClient.post(`/parkOfficers/protocols/${protocolID}/images`, images);

export const deleteProtocolImageByID = async (protocolID, imageID) =>
  await httpClient.delete(
    `/parkOfficers/protocols/${protocolID}/images/${imageID}`
  );
