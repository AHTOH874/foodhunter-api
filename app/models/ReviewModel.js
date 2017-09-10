import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1
  },
  body: {
    type: String,
    required: true
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  placeId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  collection: 'reviews',
  timestamps: true
});

export default mongoose.model('Review', reviewSchema);