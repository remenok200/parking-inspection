const axios = require('axios');
const { ParkOfficer, Protocol } = require('../models');

const generateRandomStatus = () => Math.random() < 0.8;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateParkOfficers = async (officerCount, maxProtocolsPerOfficer) => {
  console.log('=== Park officers generation has started ===');

  for (let i = 0; i < officerCount; i++) {
    const {
      data: {
        results: [user],
      },
    } = await axios.get('https://randomuser.me/api/');
    const {
      name: { first: firstName, last: lastName },
      login: { uuid: badgeNumber },
      location: { city: district },
    } = user;

    const officer = await ParkOfficer.create({
      fullName: `${firstName} ${lastName}`,
      badgeNumber,
      district,
      isWorked: generateRandomStatus(),
    });

    console.log(
      `Officer ${i + 1}/${officerCount}: ${
        officer.fullName
      } successfully created`
    );

    const protocolCount = getRandomInt(1, maxProtocolsPerOfficer);

    for (let j = 0; j < protocolCount; j++) {
      await Protocol.create({
        officerId: officer.id,
        serviceNotes: 'Violation of parking rules',
        fineAmount: getRandomInt(50, 500),
        violatorFullName: `${firstName} ${lastName}`,
        violatorPassportNumber: `MP${getRandomInt(1000000, 9999999)}`,
      });

      console.log(
        `Protocol ${j + 1}/${protocolCount} for officer ${
          officer.fullName
        } successfully created`
      );
    }
  }

  console.log('=== Park officers and protocols generation completed ===');
};

module.exports = generateParkOfficers;
