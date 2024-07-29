const parkOfficerRouter = require('express').Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');

const ParkOfficerController = require('../controllers/ParkOfficerController');

// getAllParkOfficers
// getParkOfficerByID
// createParkOfficer
// updateParkOfficerByID
// deleteParkOfficerByID
// dismissParkOfficerByID

parkOfficerRouter
.route('/')
.get(ParkOfficerController.getAllParkOfficers)
.post(ParkOfficerController.createParkOfficer);

parkOfficerRouter
.route('/:id')
.get(ParkOfficerController.getParkOfficerByID)
.put(ParkOfficerController.updateParkOfficerByID)
.delete(ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
.route('/:id/dismiss')
.put(ParkOfficerController.dismissParkOfficerByID);

// localhost:5001/api/parkOfficers/:id/protocols
parkOfficerRouter.use('/:officerId/protocols', protocolRouter);
// localhost:5001/api/parkOfficers/protocols/:id/images
parkOfficerRouter.use('/protocols/:protocolId/images', imageRouter);

module.exports = parkOfficerRouter;