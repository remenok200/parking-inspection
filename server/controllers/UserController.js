const bcrypt = require('bcrypt');
const { User, RefreshToken, Log } = require('../models/MongoDB');
const {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/createSession');
const serviceAccount = require('../config/parking-inspection-firebase-adminsdk-lumww-05adebcf60.json');
const createHttpError = require('http-errors');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');
const admin = require('firebase-admin');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const {
      body,
      body: { geolocation, ipAddress, operatingSystem, browser },
      passwordHash,
    } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    const accessToken = await createAccessToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });

    const refreshToken = await createRefreshToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: createdUser._id,
      geolocation,
      ipAddress,
      operatingSystem,
      browser,
    });

    return res
      .status(201)
      .send({ data: createdUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const {
      body: {
        email,
        password,
        geolocation,
        ipAddress,
        operatingSystem,
        browser,
      },
    } = req;

    const foundUser = await User.findOne({
      email,
    });

    if (foundUser) {
      const result = await bcrypt.compare(password, foundUser.passwordHash);
      if (!result) {
        return res.status(404).send('Incorrect email or password');
      }

      const accessToken = await createAccessToken({
        userId: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      });

      const refreshToken = await createRefreshToken({
        userId: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      });

      await RefreshToken.create({
        token: refreshToken,
        userId: foundUser._id,
        geolocation,
        ipAddress,
        operatingSystem,
        browser,
      });

      return res
        .status(200)
        .send({ data: foundUser, tokens: { accessToken, refreshToken } });
    } else {
      return res.status(404).send('Incorrect email or password');
    }
  } catch (error) {
    next(error);
  }
};

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      tokenPayload: { email },
    } = req;

    const foundUser = await User.findOne({
      email,
    });

    return res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://parking-inspection.firebaseio.com',
});

module.exports.registrationUserWithGoogle = async (req, res, next) => {
  try {
    const {
      body: { token, geolocation, ipAddress, operatingSystem, browser },
    } = req;

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name } = decodedToken;

    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      foundUser = await User.create({
        nickname: name,
        email,
      });
    }

    const accessToken = await createAccessToken({
      userId: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    });

    const refreshToken = await createRefreshToken({
      userId: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: foundUser._id,
      geolocation,
      ipAddress,
      operatingSystem,
      browser,
    });

    return res
      .status(201)
      .send({ data: foundUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUserWithGoogle = async (req, res, next) => {
  try {
    const {
      body: { token, geolocation, ipAddress, operatingSystem, browser },
    } = req;

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name } = decodedToken;

    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      foundUser = await User.create({
        nickname: name,
        email,
      });
    }

    const accessToken = await createAccessToken({
      userId: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    });

    const refreshToken = await createRefreshToken({
      userId: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: foundUser._id,
      geolocation,
      ipAddress,
      operatingSystem,
      browser,
    });

    return res
      .status(200)
      .send({ data: foundUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.refreshSession = async (req, res, next) => {
  const {
    body: { refreshToken, geolocation, ipAddress, operatingSystem, browser },
  } = req;

  let verifyResult;

  try {
    verifyResult = await verifyRefreshToken(refreshToken);
  } catch (error) {
    return next(createHttpError(401, 'Invalid refresh token'));
  }

  try {
    if (verifyResult) {
      const user = await User.findOne({ _id: verifyResult.userId });

      const oldRefreshTokenFromDB = await RefreshToken.findOne({
        $and: [{ token: refreshToken }, { userId: user._id }],
      });

      if (oldRefreshTokenFromDB) {
        await RefreshToken.deleteOne({
          $and: [{ token: refreshToken }, { userId: user._id }],
        });

        const newAccessToken = await createAccessToken({
          userId: user._id,
          email: user.email,
          role: user.role,
        });

        const newRefreshToken = await createRefreshToken({
          userId: user._id,
          email: user.email,
          role: user.role,
        });

        await RefreshToken.create({
          token: newRefreshToken,
          userId: user._id,
          geolocation,
          ipAddress,
          operatingSystem,
          browser,
        });

        return res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      }
    }

    return next(createHttpError(401, 'Token not found!'));
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const {
      params: { tokenId },
      tokenPayload: { userId },
    } = req;

    await RefreshToken.findOneAndUpdate(
      { token: tokenId },
      { $unset: { token: 1 }, $set: { isRevoked: true } },
      { new: true }
    );

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.LOGOUT,
      description: `USER ID: ${userId} logout. Token ID: ${tokenId}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: 'Logout successfully' });
  } catch (error) {
    next(error);
  }
};
