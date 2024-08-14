const bcrypt = require('bcrypt');
const { User, RefreshToken, Banlist } = require('../models/MongoDB');
const {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/createSession');
const createHttpError = require('http-errors');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const {
      body,
      body: { geolocation, ipAddress },
      passwordHash,
    } = req;

    console.log(ipAddress);

    const createdUser = await User.create({ ...body, passwordHash });

    const accessToken = await createAccessToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
      geolocation,
    });

    const refreshToken = await createRefreshToken({
      userId: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
      geolocation,
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: createdUser._id,
      geolocation,
      ipAddress,
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
      body: { email, password, geolocation, ipAddress },
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
        geolocation,
      });

      const refreshToken = await createRefreshToken({
        userId: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
        geolocation,
      });

      await RefreshToken.create({
        token: refreshToken,
        userId: foundUser._id,
        geolocation,
        ipAddress,
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

module.exports.refreshSession = async (req, res, next) => {
  const {
    body: { refreshToken, geolocation, ipAddress },
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
          geolocation,
        });

        const newRefreshToken = await createRefreshToken({
          userId: user._id,
          email: user.email,
          role: user.role,
          geolocation,
        });

        await RefreshToken.create({
          token: newRefreshToken,
          userId: user._id,
          geolocation,
          ipAddress,
        });

        return res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      }
    } else {
      return next(createHttpError(401, 'Token not found!'));
    }
  } catch (error) {
    next(error);
  }
};
