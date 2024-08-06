const { Protocol, ParkOfficer, Image } = require('../models');
const createHttpError = require('http-errors');
const { deleteImageFromDisk } = require('../utils');

// getAllProtocols
// getAllProtocolsByOfficerID
// createProtocol
// updateProtocolByID
// deleteProtocolByID

module.exports.getAllProtocols = async (req, res, next) => {
  try {
    const { pagination } = req;

    const protocols = await Protocol.findAll({
      include: [
        {
          model: ParkOfficer,
          attributes: ['id', 'full_name', 'badge_number'],
          as: 'parkOfficer',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
      ...pagination,
    });

    return res.status(200).send({ data: protocols });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProtocolsByOfficerID = async (req, res, next) => {
  try {
    const {
      params: { officerId },
      pagination,
    } = req;

    const protocols = await Protocol.findAll({
      where: { officerId },
      include: [
        {
          model: ParkOfficer,
          attributes: ['id', 'full_name', 'badge_number'],
          as: 'parkOfficer',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
      ...pagination,
    });

    return res.status(200).send({ data: protocols });
  } catch (error) {
    next(error);
  }
};

module.exports.createProtocol = async (req, res, next) => {
  try {
    const {
      params: { officerId },
      body,
      files,
    } = req;

    const officer = await ParkOfficer.findByPk(officerId);

    if (!officer || !officer.isWorked) {
      return next(
        createHttpError(400, 'Park officer is not active or does not exist')
      );
    }

    const createdProtocol = await Protocol.create({ ...body, officerId });

    if (!createdProtocol) {
      return next(createHttpError(400, 'Protocol not created'));
    }

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        protocolId: createdProtocol.id,
      }));

      await Image.bulkCreate(images);
    }

    const protocolWithData = await Protocol.findAll({
      where: { id: createdProtocol.id },
      include: [
        {
          model: ParkOfficer,
          attributes: ['id', 'full_name', 'badge_number'],
          as: 'parkOfficer',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
    });

    return res.status(201).send({ data: protocolWithData });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProtocolByID = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
      files,
    } = req;

    const [count, [updatedProtocol]] = await Protocol.update(body, {
      where: { id },
      returning: true,
    });

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        protocolId: updatedProtocol.id,
      }));

      await Image.bulkCreate(images);
    }

    if (count === 0) {
      return next(createHttpError(404, 'Protocol not found'));
    }

    const protocolWithData = await Protocol.findAll({
      where: { id: updatedProtocol.id },
      include: [
        {
          model: ParkOfficer,
          attributes: ['id', 'full_name', 'badge_number'],
          as: 'parkOfficer',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
      order: [['updated_at', 'DESC']],
    });

    return res.status(200).send({ data: protocolWithData });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProtocolByID = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const protocolWithData = await Protocol.findByPk(id, {
      include: [
        {
          model: ParkOfficer,
          attributes: ['id', 'full_name', 'badge_number'],
          as: 'parkOfficer',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    if(!protocolWithData) {
      return next(createHttpError(404));
    }

    if(protocolWithData.images.length) {
      protocolWithData.images.forEach(async (currentImage) => {
        await deleteImageFromDisk(currentImage.path);
      });
    }

    const count = await Protocol.destroy({ where: { id } });

    if (count === 0) {
      return next(createHttpError(404, 'Protocol not found'));
    }

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};
