const {
  Error: { ValidationError, CastError },
} = require('mongoose');

module.exports = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof CastError) {
    return res.status(400).send(err.message);
  }

  const code = err.status || 500;

  console.log(err);

  return res.status(code).send(err.message);
};
