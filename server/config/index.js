const path = require('path');

module.exports = {
  PORT: process.env.PORT || 5001,
  STATIC_PATH: path.resolve(__dirname, '..', 'public')
}