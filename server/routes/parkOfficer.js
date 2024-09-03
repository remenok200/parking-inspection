const express = require('express');
const parkOfficerRouter = express.Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');

const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

const ParkOfficerController = require('../controllers/ParkOfficerController');
const ProtocolController = require('../controllers/ProtocolController');

parkOfficerRouter.use(checkToken, checkBan);

parkOfficerRouter
.route('/protocols')
.get(paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
.route('/')
.get(ParkOfficerController.getAllParkOfficers)
.post(checkAdmin, ParkOfficerController.createParkOfficer);

parkOfficerRouter.route('/:id')
.get(ParkOfficerController.getParkOfficerByID)
.put(checkAdmin, ParkOfficerController.updateParkOfficerByID)
.delete(checkAdmin, ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
.route('/:id/dismiss')
.put(checkAdmin, ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter
.route('/:id/restore')
.put(checkAdmin, ParkOfficerController.restoreParkOfficerByID);

parkOfficerRouter.use('/:officerId/protocols', protocolRouter);
parkOfficerRouter.use('/protocols/:protocolId/images', imageRouter);

module.exports = parkOfficerRouter;
