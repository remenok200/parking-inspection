const { ParkOfficer } = require('../models');
const createHttpError = require('http-errors');

// getAllParkOfficers
// getParkOfficerByID
// createParkOfficer
// updateParkOfficerByID
// deleteParkOfficerByID

module.exports.getAllParkOfficers = async (req, res, next) => {
  try {
    const parkOfficers = ParkOfficer.findAll();

    return res.status(200).send({ data: parkOfficers });
  } catch (error) {
    next(error);
  }
}

module.exports.getParkOfficerByID = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const parkOfficer = await ParkOfficer.findAll({
      where: { id }
    });

    if(!parkOfficer) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    return res.status(200).send({ data: parkOfficer });
  } catch (error) {
    next(error);
  }
}

module.exports.createParkOfficer = async (req, res, next) => {
  try {
    const { body } = req;

    const createdParkOfficer = await ParkOfficer.create(body);

    if(!createdParkOfficer) {
      return next(createHttpError(400, 'Park officer not created'));
    }

    return res.status(201).send({ data: createdParkOfficer });
  } catch (error) {
    next(error);
  }
}

module.exports.updateParkOfficerByID = async (req, res, next) => {
  try {
    const { params: { id }, body } = req;

    const [count, [updatedParkOfficer]] = await ParkOfficer.update(body, {
      where: { id },
      returning: true
    });

    if(count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    return res.status(200).send({ data: updatedParkOfficer });
  } catch (error) {
    next(error);
  }
}

module.exports.deleteParkOfficerByID = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const count = await ParkOfficer.destroy({ where: { id } });

    if(count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
}