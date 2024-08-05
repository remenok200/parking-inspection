module.exports = async (err, req, res, next) => {
  const code = err.status || 500;

  console.log(err);

  return res.status(code).send({
    errors: [err]
  });
}