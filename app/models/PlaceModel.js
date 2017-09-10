import mongoose, { Schema } from 'mongoose';

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  addr: {
    type: String,
    required: true
  },
  loc: {
    type: {
      type: String,
      enum: 'Point',
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      required: true
    }
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1
  },
  categories: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  price: {
    type: Number,
    enum: [1, 2, 3],
    default: 1
  }
}, {
  collection: 'places',
  timestamps: true
});

export default mongoose.model('Place', placeSchema);