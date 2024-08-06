const router = require('express').Router();

const parkOfficerRouter = require('./parkOfficer');

const userRouter = require('./user');

router.use('/parkOfficers', parkOfficerRouter);

router.use('/users', userRouter);

module.exports = router;