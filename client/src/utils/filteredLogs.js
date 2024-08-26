export const filteredLogs = (userLogs, filterAction) => {
  if (!filterAction) return userLogs;

  return userLogs.filter((log) => {
    const exactMatchActions = ['get user refresh tokens (sessions)'];

    if (exactMatchActions.includes(filterAction)) {
      const cleanedLogAction = log.action
        .replace(/\d+/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

      return cleanedLogAction.includes(filterAction.toLowerCase());
    }

    const actionPattern = new RegExp(
      `\\b${filterAction.replace(/\d+/g, '').replace(/\s+/g, '\\s+')}\\b`,
      'i'
    );

    const cleanedLogAction = log.action
      .replace(/\d+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    return actionPattern.test(cleanedLogAction);
  });
};
