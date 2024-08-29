const protocolRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

const ProtocolController = require('../controllers/ProtocolController');

protocolRouter
.route('/')
.get(checkToken, checkBan, paginate, ProtocolController.getAllProtocolsByOfficerID)
.post(checkToken, checkBan, checkAdmin, uploadImages, ProtocolController.createProtocol);

protocolRouter
.route('/:id')
.get(checkToken, checkBan, ProtocolController.getProtocolById)
.put(checkToken, checkBan, checkAdmin, uploadImages, ProtocolController.updateProtocolByID)
.delete(checkToken, checkBan, checkAdmin, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;