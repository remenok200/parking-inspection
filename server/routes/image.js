const imageRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');
const { checkToken } = require('../middlewares/checkToken');

const ImageController = require('../controllers/ImageController');

// getProtocolImages
// addProtocolImages
// getImageByID
// deleteImageByID

imageRouter
.route('/')
.get(checkToken, ImageController.getProtocolImages)
.post(checkToken, uploadImages, ImageController.addProtocolImages);

imageRouter
.route('/:imageId')
.get(checkToken, ImageController.getImageByID)
.delete(checkToken, ImageController.deleteImageByID);

module.exports = imageRouter;