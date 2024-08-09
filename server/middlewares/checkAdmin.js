const createHttpError = require('http-errors');

module.exports.checkAdmin = async (req, res, next) => {
  try {
    const { tokenPayload: { role } } = req;

    if(role === 'admin') {
      next();
    } else {
      return next(createHttpError(400, 'Access denied: You are not admin'));
    }
  } catch (error) {
    next(error);
  }
}