const imageRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

const ImageController = require('../controllers/ImageController');

imageRouter
.route('/')
.get(checkToken, ImageController.getProtocolImages)
.post(checkToken, checkAdmin, uploadImages, ImageController.addProtocolImages);

imageRouter
.route('/:imageId')
.get(checkToken, ImageController.getImageByID)
.delete(checkToken, checkAdmin, ImageController.deleteImageByID);

module.exports = imageRouter;