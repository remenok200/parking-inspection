const { ParkOfficer } = require('../models');
const { Log } = require('../models/MongoDB');
const createHttpError = require('http-errors');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');

module.exports.getAllParkOfficers = async (req, res, next) => {
  try {
    const parkOfficers = await ParkOfficer.findAll();

    return res.status(200).send({ data: parkOfficers });
  } catch (error) {
    next(error);
  }
};

module.exports.getParkOfficerByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      tokenPayload: { userId },
    } = req;

    const parkOfficer = await ParkOfficer.findAll({
      where: { id },
    });

    if (!parkOfficer) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_PARK_OFFICER_BY_ID,
      description: `ID: ${userId} get park officer with ID: ${id}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: parkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.createParkOfficer = async (req, res, next) => {
  try {
    const {
      body,
      tokenPayload: { userId },
    } = req;

    const createdParkOfficer = await ParkOfficer.create(body);

    if (!createdParkOfficer) {
      return next(createHttpError(400, 'Park officer not created'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.CREATE_PARK_OFFICER,
      description: `ID: ${userId} create park officer. Officer ID: ${createdParkOfficer.id} (created officer)`,
      performedBy: userId,
    });

    return res.status(201).send({ data: createdParkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.updateParkOfficerByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
      tokenPayload: { userId },
    } = req;

    const [count, [updatedParkOfficer]] = await ParkOfficer.update(body, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.UPDATE_PARK_OFFICER,
      description: `ID: ${userId} update park officer. Park officer ID: ${id}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: updatedParkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteParkOfficerByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      tokenPayload: { userId },
    } = req;

    const count = await ParkOfficer.destroy({ where: { id } });

    if (count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.DELETE_PARK_OFFICER,
      description: `ID: ${userId} delete park officer. Park officer ID: ${id} (officer deleted)`,
      performedBy: userId,
    });

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports.dismissParkOfficerByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      tokenPayload: { userId },
    } = req;

    const [count, [updatedParkOfficer]] = await ParkOfficer.update(
      {
        isWorked: false,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.DISMISS_PARK_OFFICER,
      description: `ID: ${userId} dismiss park officer. Park officer ID: ${id}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: updatedParkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.restoreParkOfficerByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      tokenPayload: { userId },
    } = req;

    const [count, [updatedParkOfficer]] = await ParkOfficer.update(
      {
        isWorked: true,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (count === 0) {
      return next(createHttpError(404, 'Park officer not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.RESTORE_PARK_OFFICER,
      description: `ID: ${userId} restore park officer. Park officer ID: ${id}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: updatedParkOfficer });
  } catch (error) {
    next(error);
  }
};
