const imageRouter = require('express').Router({ mergeParams: true });

const { uploadImages } = require('../middlewares/imagesUpload');

const ImageController = require('../controllers/ImageController');

// getProtocolImages
// addProtocolImages
// getImageByID
// deleteImageByID

imageRouter
.route('/')
.get(ImageController.getProtocolImages)
.post(uploadImages, ImageController.addProtocolImages);

imageRouter
.route('/:imageId')
.get(ImageController.getImageByID)
.delete(ImageController.deleteImageByID);

module.exports = imageRouter;