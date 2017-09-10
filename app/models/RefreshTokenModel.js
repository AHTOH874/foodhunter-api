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
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'refreshTokens'
});

refreshTokenSchema.methods.isValid = function(secret) {
  const expires = process.env.AUTH_REFRESH_TOKEN_EXPIRES && parseFloat(process.env.AUTH_REFRESH_TOKEN_EXPIRES);
  return Math.round((Date.now() - this.created) / 1000) < expires;
};

export default mongoose.model('RefreshToken', refreshTokenSchema);