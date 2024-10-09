const { Image } = require('../models');
const createHttpError = require('http-errors');
const { Log } = require('../models/MongoDB');
const { deleteImageFromDisk } = require('../utils');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');

module.exports.getProtocolImages = async (req, res, next) => {
  try {
    const {
      params: { protocolId },
      tokenPayload: { userId },
    } = req;

    const images = await Image.findAll({
      where: { protocolId },
    });

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_ALL_PROTOCOL_IMAGES,
      description: `ID: ${userId} get all protocol images. Protocol id: ${protocolId}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: images });
  } catch (error) {
    next(error);
  }
};

module.exports.addProtocolImages = async (req, res, next) => {
  try {
    const {
      params: { protocolId },
      files,
      tokenPayload: { userId },
    } = req;

    const images = files.map((file) => ({ path: file.filename, protocolId }));

    const imagesFromDB = await Image.bulkCreate(images, { returning: true });

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.ADD_IMAGES_TO_PROTOCOL,
      description: `ID: ${userId} add ${images.length} image(s) to protocol. Protocol id: ${protocolId}`,
      performedBy: userId,
    });

    return res.status(201).send({ data: imagesFromDB });
  } catch (error) {
    next(error);
  }
};

module.exports.getImageByID = async (req, res, next) => {
  try {
    const {
      params: { protocolId, imageId },
      tokenPayload: { userId },
    } = req;

    const image = await Image.findOne({ where: { protocolId, id: imageId } });

    if (!image) {
      return next(createHttpError(404, 'Image not found'));
    }

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.GET_IMAGE_BY_ID,
      description: `ID: ${userId} get image by ID: ${imageId}. Protocol ID: ${protocolId}`,
      performedBy: userId,
    });

    return res.status(200).send({ data: image });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteImageByID = async (req, res, next) => {
  try {
    const {
      params: { protocolId, imageId },
      tokenPayload: { userId },
    } = req;

    const image = await Image.findOne({ where: { protocolId, id: imageId } });

    if (!image) {
      return next(createHttpError(404));
    }

    const count = await Image.destroy({ where: { protocolId, id: imageId } });

    if (count === 0) {
      return next(createHttpError(404, 'Image not found'));
    }

    await deleteImageFromDisk(image.path);

    await Log.createLog({
      actionType: LOG_ACTION_TYPES.DELETE_IMAGES,
      description: `ID: ${userId} delete ${count} image(s). Protocol ID: ${protocolId}`,
      performedBy: userId,
    });

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};
