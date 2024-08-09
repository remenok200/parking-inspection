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
    const bannedUsers = await Banlist.find();

    const usersWithBans = [];

    for (const ban of bannedUsers) {
      const user = await User.findOne({ userId: ban.userId });

      const userInfo = {
        user,
        banInfo: ban,
      };

      usersWithBans.push(userInfo);
    }

    return res.status(200).send({ data: usersWithBans });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    const bannedUsers = await Banlist.find();
    const bannedUsersIds = bannedUsers.map((ban) => ban.userId);

    const filteredUsers = allUsers.filter(
      (user) => !bannedUsersIds.includes(user._id)
    );

    return res.status(200).send({ data: filteredUsers });
  } catch (error) {
    next(error);
  }
};
