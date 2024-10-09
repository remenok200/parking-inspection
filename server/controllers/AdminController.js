const {
  User,
  Banlist,
  RefreshToken,
  Log,
  LogActionType
} = require('../models/MongoDB');
const createHttpError = require('http-errors');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');

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

      await Log.createLog({
        actionType: LOG_ACTION_TYPES.BAN_USER,
        description: `ADMIN ID: ${adminId} ban user. User ID: ${userId}`,
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
      await Log.createLog({
        actionType: LOG_ACTION_TYPES.UNBAN_USER,
        description: `ADMIN ID: ${adminId} unban user. User ID: ${userId}`,
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

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_ALL_BANNED_USERS,
      description: `ADMIN ID: ${userId} get all banned users`,
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

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_ALL_USERS,
      description: `ADMIN ID: ${userId} get all users`,
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

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_USER_REFRESH_TOKENS,
      description: `ADMIN ID: ${adminId} get user refresh tokens (sessions). User ID: ${userId}`,
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

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_USER_REFRESH_TOKENS,
      description: `ADMIN ID: ${userId} revoke refresh token. Token ID: ${tokenId}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: 'Refresh token revoked successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllLogs = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId },
    } = req;

    const logs = await Log.find();

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_ALL_LOGS,
      description: `ADMIN ID: ${userId} get all logs`,
      performedBy: userId,
    });

    return res.status(200).send({ data: logs });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllLogsByUserID = async (req, res, next) => {
  try {
    const {
      params: { userId },
      tokenPayload: { userId: adminId },
    } = req;

    const logs = await Log.find({ performedBy: userId });

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_ALL_USER_LOGS,
      description: `ADMIN ID: ${adminId} get all user logs. User ID: ${userId}`,
      performedBy: adminId,
    });

    return res.status(200).send({ data: logs });
  } catch (error) {
    next(error);
  }
};

module.exports.makeAdmin = async (req, res, next) => {
  try {
    const {
      params: { userId },
      tokenPayload: { userId: adminId },
    } = req;

    const user = await User.findOneAndUpdate(
      { _id: userId, role: { $ne: 'admin' } },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      return next(createHttpError(404, 'User not found or already an admin'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.MAKE_ADMIN,
      description: `ADMIN ID: ${adminId} make user admin. User ID: ${userId}`,
      performedBy: adminId,
    });

    return res
      .status(200)
      .send({ data: 'User promoted to admin successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.removeAdmin = async (req, res, next) => {
  try {
    const {
      params: { userId },
      tokenPayload: { userId: adminId },
    } = req;

    const user = await User.findOneAndUpdate(
      { _id: userId, role: 'admin' },
      { $set: { role: 'user' } },
      { new: true }
    );

    if (!user) {
      return next(createHttpError(404, 'User not found or not an admin'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.REMOVE_ADMIN,
      description: `ADMIN ID: ${adminId} removed user admin. User ID: ${userId}`,
      performedBy: adminId,
    });

    return res.status(200).send({ data: 'Admin role removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllActionTypes = async (req, res, next) => {
  try {
    const actionTypes = await LogActionType.find();

    return res.status(200).send({ data: actionTypes });
  } catch (error) {
    next(error);
  }
};
