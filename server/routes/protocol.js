const protocolRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

const ProtocolController = require('../controllers/ProtocolController');

protocolRouter
.route('/')
.get(checkToken, paginate, ProtocolController.getAllProtocolsByOfficerID)
.post(checkToken, checkAdmin, uploadImages, ProtocolController.createProtocol);

protocolRouter
.route('/:id')
.put(checkToken, checkAdmin, uploadImages, ProtocolController.updateProtocolByID)
.delete(checkToken, checkAdmin, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;