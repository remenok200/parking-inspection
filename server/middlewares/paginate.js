const { LIMIT } = require('../config/constants');

module.exports = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    if (page) {
      const offset = (page - 1) * LIMIT;
      const limit = LIMIT;

      req.pagination = { limit, offset };
    }

    next();
  } catch (error) {
    next(error);
  }
};
