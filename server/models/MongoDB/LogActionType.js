const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { LOG_ACTION_TYPES } = require('../../config/logActionTypes');

const logActionTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: Object.values(LOG_ACTION_TYPES),
  },
});

const LogActionType = mongoose.model('LogActionType', logActionTypeSchema);

module.exports = LogActionType;
