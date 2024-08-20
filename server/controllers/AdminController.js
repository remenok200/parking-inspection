const { User, Banlist, RefreshToken, Log } = require('../models/MongoDB');
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

      await Log.create({
        action: `ADMIN ID: ${adminId} banned user. User ID: ${userId}`,
        performedBy: adminId,
      });

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
      params: { userId },
    } = req;

    const result = await Banlist.deleteOne({ adminId, userId });

    if (result.deletedCount > 0) {
      await Log.create({
        action: `ADMIN ID: ${adminId} unbanned user. User ID: ${userId}`,
        performedBy: adminId,
      });

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
    const {
      tokenPayload: { userId },
    } = req;

    const bannedUsers = await Banlist.find().populate('userId');

    const usersWithBans = bannedUsers.map((ban) => ({
      user: ban.userId,
      banInfo: ban,
    }));

    await Log.create({
      action: `ADMIN ID: ${userId} get all banned users`,
      performedBy: userId,
    });

    return res.status(200).send({ data: usersWithBans });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId },
    } = req;

    const bannedUsers = await Banlist.find().select('userId');
    const bannedUserIds = bannedUsers.map((ban) => ban.userId);

    const filteredUsers = await User.find({
      _id: { $nin: bannedUserIds },
    });

    await Log.create({
      action: `ADMIN ID: ${userId} get all users`,
      performedBy: userId,
    });

    return res.status(200).send({ data: filteredUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserRefreshTokens = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId: adminId },
    } = req;

    const {
      params: { userId },
    } = req;

    const refreshTokens = await RefreshToken.find({ userId });

    await Log.create({
      action: `ADMIN ID: ${adminId} get user refresh tokens (sessions). User ID: ${userId}`,
      performedBy: adminId,
    });

    return res.status(200).send({ data: refreshTokens });
  } catch (error) {
    next(error);
  }
};

module.exports.revokeRefreshToken = async (req, res, next) => {
  try {
    const {
      params: { tokenId },
      tokenPayload: { userId },
    } = req;

    const refreshToken = await RefreshToken.findOneAndUpdate(
      { _id: tokenId },
      { $unset: { token: 1 }, $set: { isRevoked: true } },
      { new: true }
    );

    if (!refreshToken) {
      return next(createHttpError(404, 'Refresh token not found'));
    }

    await Log.create({
      action: `ADMIN ID: ${userId} revoke refresh token. Token ID: ${tokenId}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: 'Refresh token revoked successfully' });
  } catch (error) {
    next(error);
  }
};
