const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  geolocation: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  operatingSystem: {
    type: String,
  },
  browser: {
    type: String,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
