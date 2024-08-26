const adminRouter = require('express').Router();

const AdminController = require('../controllers/AdminController');

const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

adminRouter
.route('/banlist')
.post(checkToken, checkBan, checkAdmin, AdminController.ban);

adminRouter
.route('/banlist/unban/:userId')
.delete(checkToken, checkBan, checkAdmin, AdminController.unban);

adminRouter
.route('/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllUsers);

adminRouter
.route('/all/banned')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllBannedUsers);

adminRouter
.route('/tokens/:userId')
.get(checkToken, checkBan, checkAdmin, AdminController.getUserRefreshTokens);

adminRouter
.route('/tokens/:tokenId/revoke')
.put(checkToken, checkBan, checkAdmin, AdminController.revokeRefreshToken);

adminRouter
.route('/logs/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllLogs);

adminRouter
.route('/logs/:userId/all')
.get(checkToken, checkBan, checkAdmin, AdminController.getAllLogsByUserID);

adminRouter
.route('/admins/:userId')
.put(checkToken, checkBan, checkAdmin, AdminController.makeAdmin)
.delete(checkToken, checkBan, checkAdmin, AdminController.removeAdmin);

module.exports = adminRouter;
