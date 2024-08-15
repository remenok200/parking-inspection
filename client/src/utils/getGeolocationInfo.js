import axios from 'axios';

export const getGeolocationInfo = async (geolocation) => {
  const [latitude, longitude] = geolocation.split(' ');
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
    );
    
    return {
      country: response.data.address.country,
      region: response.data.address.state,
      city: response.data.address.city || response.data.address.town,
      street: response.data.address.road,
      countryCode: response.data.address.country_code,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error('Error fetching geolocation info:', error);
    return null;
  }
};
