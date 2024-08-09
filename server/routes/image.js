const imageRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

const ImageController = require('../controllers/ImageController');

imageRouter
.route('/')
.get(checkToken, checkBan, ImageController.getProtocolImages)
.post(checkToken, checkBan, checkAdmin, uploadImages, ImageController.addProtocolImages);

imageRouter
.route('/:imageId')
.get(checkToken, checkBan, ImageController.getImageByID)
.delete(checkToken, checkBan, checkAdmin, ImageController.deleteImageByID);

module.exports = imageRouter;