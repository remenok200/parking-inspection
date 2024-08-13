const { User, Banlist } = require('../models/MongoDB');
const createHttpError = require('http-errors');

module.exports.ban = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId: adminId },
      body: { userId, reason },
    } = req;

    const foundUser = await User.findOne({
      _id: userId,
    });

    if (foundUser) {
      const existingBan = await Banlist.findOne({ userId });

      if (existingBan) {
        return next(createHttpError(400, 'User is already banned'));
      }

      const banned = await Banlist.create({ adminId, userId, reason });

      return res.status(200).send({ data: banned });
    } else {
      return next(createHttpError(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.unban = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId: adminId },
      body: { userId },
    } = req;

    const result = await Banlist.deleteOne({ adminId, userId });

    if (result.deletedCount > 0) {
      return res.status(200).send('User unbanned successfully');
    } else {
      return next(createHttpError(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllBannedUsers = async (req, res, next) => {
  try {
    const bannedUsers = await Banlist.find().populate('userId');

    const usersWithBans = bannedUsers.map((ban) => ({
      user: ban.userId,
      banInfo: ban,
    }));

    return res.status(200).send({ data: usersWithBans });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const bannedUsers = await Banlist.find().select('userId');
    const bannedUserIds = bannedUsers.map((ban) => ban.userId);

    const filteredUsers = await User.find({
      _id: { $nin: bannedUserIds },
    });

    return res.status(200).send({ data: filteredUsers });
  } catch (error) {
    next(error);
  }
};
