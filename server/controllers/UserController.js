const bcrypt = require('bcrypt');
const { User, RefreshToken, Log } = require('../models/MongoDB');
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  createResetToken,
  verifyResetToken,
} = require('../services/createSession');
const serviceAccount = require('../config/parking-inspection-firebase-adminsdk-lumww-05adebcf60.json');
const createHttpError = require('http-errors');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');
const admin = require('firebase-admin');
const { RESET_EXPIRES_TIME, SALT_ROUND } = require('../config/constants');
const nodemailer = require('nodemailer');

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

module.exports.sendPasswordResetLink = async (req, res, next) => {
  try {
    const {
      body: { email },
    } = req;
    const user = await User.findOne({ email });

    if (!user) {
      return next(createHttpError(404, 'User not found!'));
    }

    const resetToken = await createResetToken(user);
    // const resetLink = `${req.protocol}://${req.get(
    //   'host'
    // )}/reset-password/${resetToken}`;
    const resetLink = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;

    // https://ethereal.email/
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'taya.stoltenberg99@ethereal.email',
        pass: 'N87BskjZ8UA2Jw9GbE',
      },
    });
    
    await transporter.sendMail(
      {
        from: '"Support" <support@example.com>',
        to: user.email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}. This link will expire in ${RESET_EXPIRES_TIME}.`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>This link will expire in ${RESET_EXPIRES_TIME}.</p>`,
      },
      (err, info) => {
        if (err) {
          return next(createHttpError(400, 'Email not sent!'));
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    );

    return res
      .status(200)
      .send({ data: 'Password reset link sent to your email.' });
  } catch (error) {
    next(error);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const {
      params: { token },
    } = req;
    const {
      body: { newPassword },
    } = req;

    const decoded = await verifyResetToken(token);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return next(createHttpError(404, 'User not found!'));
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUND);
    await User.findOneAndUpdate(
      { _id: user._id },
      { passwordHash: hashedPassword }
    );

    return res.status(200).send({ data: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};
