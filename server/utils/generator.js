const axios = require('axios');
const { sequelize } = require('../models');

const generateRandomStatus = () => Math.random() < 0.8;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateParkOfficers = async (officerCount, maxProtocolsPerOfficer) => {
  try {
    console.log('=== The generator has started ===');

    const officers = [];
    const protocols = [];

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

      officers.push({
        fullName: `${firstName} ${lastName}`,
        badgeNumber,
        district,
        isWorked: generateRandomStatus(),
      });
    }

    const officerInsertQuery = `
      INSERT INTO park_officers ("full_name", "badge_number", "district", "is_worked", "created_at", "updated_at") VALUES 
      ${officers
        .map(
          (officer) =>
            `('${officer.fullName}', '${officer.badgeNumber}', '${officer.district}', ${officer.isWorked}, NOW(), NOW())`
        )
        .join(', ')} 
      RETURNING id;
    `;

    const [insertedOfficers] = await sequelize.query(officerInsertQuery);

    for (const officer of insertedOfficers) {
      const protocolCount = getRandomInt(1, maxProtocolsPerOfficer);

      for (let j = 0; j < protocolCount; j++) {
        protocols.push({
          officerId: officer.id,
          serviceNotes: 'Violation of parking rules',
          fineAmount: getRandomInt(50, 500),
          violatorFullName: `John Doe`,
          violatorPassportNumber: `MP${getRandomInt(1000000, 9999999)}`,
        });
      }
    }

    const protocolInsertQuery = `
      INSERT INTO protocols ("officer_id", "service_notes", "fine_amount", "violator_full_name", "violator_passport_number", "created_at", "updated_at") VALUES 
      ${protocols
        .map(
          (protocol) =>
            `(${protocol.officerId}, '${protocol.serviceNotes}', ${protocol.fineAmount}, '${protocol.violatorFullName}', '${protocol.violatorPassportNumber}', NOW(), NOW())`
        )
        .join(', ')};
    `;

    await sequelize.query(protocolInsertQuery);

    console.log('=== The generator has finished its work. ===');
  } catch (error) {
    console.log(
      '=== An error occurred during the generation process ===',
      error
    );
    process.exit(1);
  }
};

module.exports = generateParkOfficers;
