const parkOfficerRouter = require('express').Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');

const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

const ParkOfficerController = require('../controllers/ParkOfficerController');
const ProtocolController = require('../controllers/ProtocolController');

parkOfficerRouter.
route('/protocols')
.get(checkToken, paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
.route('/')
.get(checkToken, ParkOfficerController.getAllParkOfficers)
.post(checkToken, checkAdmin, ParkOfficerController.createParkOfficer);

parkOfficerRouter
.route('/:id')
.get(checkToken, ParkOfficerController.getParkOfficerByID)
.put(checkToken, checkAdmin, ParkOfficerController.updateParkOfficerByID)
.delete(checkToken, checkAdmin, ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
.route('/:id/dismiss')
.put(checkToken, checkAdmin, ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter
.route('/:id/restore')
.put(checkToken, checkAdmin, ParkOfficerController.restoreParkOfficerByID);

parkOfficerRouter.use('/:officerId/protocols', protocolRouter);

parkOfficerRouter.use('/protocols/:protocolId/images', imageRouter);

module.exports = parkOfficerRouter;