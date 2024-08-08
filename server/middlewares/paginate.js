const { LIMIT } = require('../config/constants');

module.exports = async (req, res, next) => {
  try {
    const {
      query: { page = 1 },
    } = req;

    const offset = (page - 1) * LIMIT;
    const limit = LIMIT;
    
    req.pagination = { limit, offset };
    
    next();
  } catch (error) {
    next(error);
  }
};
