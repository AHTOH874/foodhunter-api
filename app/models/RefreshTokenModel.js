import mongoose, { Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  }
}, {
  collection: 'refreshTokens',
  timestamps: true
});

export default mongoose.model('RefreshToken', refreshTokenSchema);