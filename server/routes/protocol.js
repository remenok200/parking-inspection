const protocolRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');

const ProtocolController = require('../controllers/ProtocolController');

// getAllProtocols
// getAllProtocolsByOfficerID
// createProtocol
// updateProtocolByID
// deleteProtocolByID

protocolRouter
.route('/')
.get(checkToken, paginate, ProtocolController.getAllProtocolsByOfficerID)
.post(checkToken, uploadImages, ProtocolController.createProtocol);

protocolRouter
.route('/:id')
.put(checkToken, uploadImages, ProtocolController.updateProtocolByID)
.delete(checkToken, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;