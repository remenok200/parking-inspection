'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Protocol extends Model {
    static associate({ ParkOfficer, Image }) {
      Protocol.belongsTo(ParkOfficer, {
        foreignKey: 'officerId'
      });

      Protocol.hasMany(Image, {
        foreignKey: 'protocolId'
      });
    }
  }
  Protocol.init({
    serviceNotes: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    fineAmount: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    violatorFullName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    violatorPassportNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Protocol',
    tableName: 'protocols',
    underscored: true
  });

  return Protocol;
}