const express = require('express');
const protocolRouter = express.Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

const ProtocolController = require('../controllers/ProtocolController');

protocolRouter.use(checkToken, checkBan);

protocolRouter
.route('/')
.get(paginate, ProtocolController.getAllProtocolsByOfficerID)
.post(checkAdmin, uploadImages, ProtocolController.createProtocol);

protocolRouter.route('/:id')
.get(ProtocolController.getProtocolById)
.put(checkAdmin, uploadImages, ProtocolController.updateProtocolByID)
.delete(checkAdmin, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;
