const parkOfficerRouter = require('express').Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');

const paginate = require('../middlewares/paginate');
const { checkToken } = require('../middlewares/checkToken');

const ParkOfficerController = require('../controllers/ParkOfficerController');
const ProtocolController = require('../controllers/ProtocolController');

// getAllParkOfficers
// getParkOfficerByID
// createParkOfficer
// updateParkOfficerByID
// deleteParkOfficerByID
// dismissParkOfficerByID
// restoreParkOfficerByID

// localhost:5001/api/parkOfficers/protocols
parkOfficerRouter.
route('/protocols')
.get(checkToken, paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
.route('/')
.get(checkToken, ParkOfficerController.getAllParkOfficers)
.post(checkToken, ParkOfficerController.createParkOfficer);

parkOfficerRouter
.route('/:id')
.get(checkToken, ParkOfficerController.getParkOfficerByID)
.put(checkToken, ParkOfficerController.updateParkOfficerByID)
.delete(checkToken, ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
.route('/:id/dismiss')
.put(checkToken, ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter
.route('/:id/restore')
.put(checkToken, ParkOfficerController.restoreParkOfficerByID);

// localhost:5001/api/parkOfficers/:id/protocols
parkOfficerRouter.use('/:officerId/protocols', protocolRouter);
// localhost:5001/api/parkOfficers/protocols/:id/images
parkOfficerRouter.use('/protocols/:protocolId/images', imageRouter);

module.exports = parkOfficerRouter;