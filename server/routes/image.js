const express = require('express');
const imageRouter = express.Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const { checkToken } = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');
const ImageController = require('../controllers/ImageController');

imageRouter.use(checkToken, checkBan);

imageRouter
.route('/')
.get(ImageController.getProtocolImages)
.post(checkAdmin, uploadImages, ImageController.addProtocolImages);

imageRouter
.route('/:imageId')
.get(ImageController.getImageByID)
.delete(checkAdmin, ImageController.deleteImageByID);

module.exports = imageRouter;
