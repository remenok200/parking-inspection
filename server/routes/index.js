const router = require('express').Router();

const parkOfficerRouter = require('./parkOfficer');

router.use('/parkOfficers', parkOfficerRouter);

module.exports = router;