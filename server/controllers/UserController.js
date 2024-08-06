const bcrypt = require('bcrypt');
const { User } = require('../models/MongoDB');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    return res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
}

module.exports.loginUser = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;

    const foundUser = await User.findOne({
      email
    });

    if(foundUser) {
      const result = await bcrypt.compare(password, foundUser.passwordHash);
      if(!result) {
        return res.status(404).send('Incorrect email or password');
      }
      return res.status(200).send({ data: foundUser });
    } else {
      return res.status(404).send('Incorrect email or password');
    }
  } catch (error) {
    next(error);
  }
}