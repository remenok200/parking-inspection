const express = require('express');
const adminRouter = express.Router();

const AdminController = require('../controllers/AdminController');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

adminRouter.use(checkToken, checkBan, checkAdmin);

adminRouter
.route('/banlist')
.post(AdminController.ban);

adminRouter
.route('/banlist/unban/:userId')
.delete(AdminController.unban);

adminRouter
.route('/all')
.get(AdminController.getAllUsers);

adminRouter
.route('/all/banned')
.get(AdminController.getAllBannedUsers);

adminRouter
.route('/tokens/:userId')
.get(AdminController.getUserRefreshTokens);

adminRouter
.route('/tokens/:tokenId/revoke')
.put(AdminController.revokeRefreshToken);

adminRouter
.route('/logs/actionTypes')
.get(AdminController.getAllActionTypes);

adminRouter
.route('/logs/all')
.get(AdminController.getAllLogs);

adminRouter
.route('/logs/:userId/all')
.get(AdminController.getAllLogsByUserID);

adminRouter
.route('/admins/:userId')
.put(AdminController.makeAdmin)
.delete(AdminController.removeAdmin);

module.exports = adminRouter;
