import axios from 'axios';

export const getIPFromAmazon = async () => {
  try {
    const response = await axios.get('https://checkip.amazonaws.com/');
    return response.data.trim();
  } catch (error) {
    console.error('Error fetching IP address:', error);
  }
};
