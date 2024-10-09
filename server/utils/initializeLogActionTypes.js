const { LogActionType } = require('../models/MongoDB');
const { LOG_ACTION_TYPES } = require('../config/logActionTypes');

const initializeLogActionTypes = async () => {
  const actionTypes = Object.values(LOG_ACTION_TYPES);

  for (const type of actionTypes) {
    const existingActionType = await LogActionType.findOne({ type });

    if (!existingActionType) {
      await LogActionType.create({ type });
    }
  }
};

module.exports = initializeLogActionTypes;
