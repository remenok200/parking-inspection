const userRouter = require('express').Router();
const UserController = require('../controllers/UserController');
const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');

userRouter
.route('/sign-up')
.post(hashPass, UserController.registrationUser);

userRouter
.route('/sign-in')
.post(UserController.loginUser);

userRouter
.route('/')
.get(checkToken, UserController.checkAuth);

userRouter
.route('/refresh')
.post(UserController.refreshSession);

module.exports = userRouter;