const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  performedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log', logSchema);

Log.createLog = async (logData) => {
  const loggingEnabled = process.env.LOGGING_ENABLED === 'true';

  if (!loggingEnabled) {
    console.log('Logging is disabled. Skipping log creation.');
    return;
  }

  try {
    await Log.create(logData);
  } catch (error) {
    console.error('Error creating log entry:', error);
  }
};

module.exports = Log;
