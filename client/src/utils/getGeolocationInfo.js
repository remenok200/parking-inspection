import axios from 'axios';

export const getGeolocationInfo = async (geolocation) => {
  const [latitude, longitude] = geolocation.split(' ');

  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
    );

    const { address } = data;
    const {
      country,
      state: region,
      city,
      town,
      road: street,
      country_code: countryCode,
    } = address;

    return {
      country: country || 'Unknown',
      region: region || 'Unknown',
      city: city || town || 'Unknown',
      street: street || 'Unknown',
      countryCode: countryCode || 'unknown',
      latitude,
      longitude,
    };
  } catch (error) {
    console.error('Error fetching geolocation info:', error);
    return null;
  }
};
