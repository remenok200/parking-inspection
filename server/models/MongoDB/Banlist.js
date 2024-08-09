const mongoose = require('mongoose');
const { Schema } = mongoose;

const banlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Banlist = mongoose.model('Banlist', banlistSchema);

module.exports = Banlist;