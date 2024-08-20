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
.post(checkToken, checkBan, checkAdmin, AdminController.ban);

userRouter
.route('/banlist/unban/:userId')
.delete(checkToken, checkBan, checkAdmin, AdminController.unban);

userRouter
.route('/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllUsers);

userRouter
.route('/all/banned')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllBannedUsers);

userRouter
.route('/tokens/:userId')
.get(checkToken, checkBan, checkAdmin, AdminController.getUserRefreshTokens);

userRouter
.route('/tokens/:tokenId/revoke')
.put(checkToken, checkBan, checkAdmin, AdminController.revokeRefreshToken);

userRouter
.route('/logs/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllLogs);

userRouter
.route('/logs/:userId/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllLogsByUserID);

module.exports = userRouter;