'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('protocols', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceNotes: {
        field: 'service_notes',
        type: Sequelize.STRING,
        allowNull: false
      },
      officerId: {
        field: 'officer_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'park_officers',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      fineAmount: {
        field: 'fine_amount',
        type: Sequelize.DOUBLE,
        allowNull: false
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
    await queryInterface.dropTable('protocols');  
  }
}