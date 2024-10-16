const router = require('express').Router();

const parkOfficerRouter = require('./parkOfficer');

const userRouter = require('./user');

const { checkToken } = require('../middlewares/checkToken');
const { checkBan } = require('../middlewares/checkBan');
const ProtocolController = require('../controllers/ProtocolController');

router.use('/parkOfficers', parkOfficerRouter);

router.use('/users', userRouter);

router.get(
  '/violator/:passportNumber',
  checkToken,
  checkBan,
  ProtocolController.getProtocolsByViolatorPassportNumber
);

module.exports = router;
