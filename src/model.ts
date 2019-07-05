import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imageName: {
    type: String,
    default: 'none'
  },
  image: {
    type: String
  },
  imageProps: {
    type: Schema.Types.Mixed
  }
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
