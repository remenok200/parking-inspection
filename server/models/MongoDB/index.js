const mongoose = require('mongoose');
const path = require('path');
const User = require('./User');
const RefreshToken = require('./RefreshToken');
const Banlist = require('./Banlist');
const Log = require('./Log');

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', '..', '/config/configMongo.json');
const config = require(configPath)[env];

const { host, database } = config;
const mongoURI = `mongodb://${host}:27017/${database}`;

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log(`Connection to MongoDB <<< ${config.database} >>> is OK`)
  )
  .catch((err) => {
    console.log('Unable to connect to the MongoDB:', err);
    process.exit(1);
  });

module.exports = {
  User,
  RefreshToken,
  Banlist,
  Log
};
