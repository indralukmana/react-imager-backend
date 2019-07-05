import express from 'express';
import Image from './model';

const ImageRouter = express.Router();

ImageRouter.route('/uploadbase').post((req, res, next) => {
  console.log(req.body);
  const { imageName, image, imageProps } = req.body;
  const newImage = new Image({
    imageName,
    image,
    imageProps
  });

  newImage
    .save()
    .then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch(err => next(err));
});

export default ImageRouter;
