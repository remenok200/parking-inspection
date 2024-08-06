const bcrypt = require('bcrypt');
const CONSTANTS = require('../config/constants');

module.exports.hashPass = async (req, res, next) => {
  try {
    const { body, body: { password } } = req;

    req.passwordHash = await bcrypt.hash(password, CONSTANTS.SALT_ROUND);

    delete body.password;

    next();
  } catch (error) {
    next(error);
  }
}