import axios from 'axios';

export const getIPInfo = async (ipAddress) => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ipAddress}`);

    const { country, countryCode: countryCodeRaw, city, isp: provider } = data;

    return {
      country: country || 'Unknown',
      countryCode: (countryCodeRaw || 'unknown').toLowerCase(),
      city: city || 'Unknown',
      provider: provider || 'Unknown',
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return null;
  }
};
