const { Banlist } = require('../models/MongoDB');
const createHttpError = require('http-errors');

module.exports.checkBan = async (req, res, next) => {
  try {
    const { tokenPayload: { userId } } = req;

    const banned = await Banlist.findOne({ userId });

    if(banned) {
      return next(createHttpError(401, 'You are banned!'));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}