const userRouter = require('express').Router();

const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');

const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

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

userRouter
.route('/banlist')
.post(checkToken, checkBan, checkAdmin, AdminController.ban)
.delete(checkToken, checkBan, checkAdmin, AdminController.unban);

userRouter
.route('/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllUsers);

userRouter
.route('/all/banned')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllBannedUsers);

module.exports = userRouter;