// http://localhost:5001/api/parkOfficers/protocols/8/images

export const addProtocolImages = async (images, protocolID) => {
  const url = `http://localhost:5001/api/parkOfficers/protocols/${protocolID}/images`;

  const requestOptions = {
    method: 'POST',
    body: images
  }

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}