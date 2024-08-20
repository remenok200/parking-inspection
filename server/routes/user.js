const userRouter = require('express').Router();
const UserController = require('../controllers/UserController');
const adminRouter = require('./admin');
const { hashPass } = require('../middlewares/hashPassword');

userRouter
.route('/sign-up')
.post(hashPass, UserController.registrationUser);

userRouter
.route('/sign-in')
.post(UserController.loginUser);

userRouter
.route('/')
.get(UserController.checkAuth);

userRouter
.route('/refresh')
.post(UserController.refreshSession);

userRouter.use('/', adminRouter); 

module.exports = userRouter;
