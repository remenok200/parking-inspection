const userRouter = require('express').Router();

const UserController = require('../controllers/UserController');

const adminRouter = require('./admin');

const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');

userRouter
.route('/sign-up')
.post(hashPass, UserController.registrationUser);

userRouter
.route('/sign-in')
.post(UserController.loginUser);

userRouter
.route('/sign-up/google')
.post(UserController.registrationUserWithGoogle);

userRouter
.route('/sign-in/google')
.post(UserController.loginUserWithGoogle);

userRouter
.route('/')
.get(checkToken, UserController.checkAuth);

userRouter
.route('/refresh')
.post(UserController.refreshSession);

userRouter
.route('/logout/:tokenId')
.delete(checkToken, UserController.logout);

userRouter.use('/', adminRouter); 

module.exports = userRouter;
