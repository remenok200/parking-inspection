module.exports = async (err, req, res, next) => {
  const code = err.status || 500;

  return res.status(code).send({
    errors: [err]
  });
}