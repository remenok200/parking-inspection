import axios from 'axios';

export const getIPInfo = async (ipAddress) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    return {
      country: response.data.country,
      countryCode: response.data.countryCode.toLowerCase(),
      city: response.data.city,
      provider: response.data.isp,
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return null;
  }
};
