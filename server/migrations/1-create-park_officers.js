'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('park_officers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        field: 'full_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      badgeNumber: {
        field: 'badge_number',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isWorked: {
        field: 'is_worked',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('park_officers');
  }
}