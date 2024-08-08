const { verifyAccessToken } = require('../services/createSession');
const createHttpError = require('http-errors');

module.exports.checkToken = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;

    if(!authorization) {
      return next(createHttpError(401, 'Need Bearer authorization'));
    }

    const [, token] = authorization.split(' ');
    
    const payload = await verifyAccessToken(token);
    
    req.tokenPayload = payload;

    next();
  } catch (error) {
    next(error);
  }
}