export const addLog = (log) => ({
  type: 'ADD_LOG',
  log,
});

export const removeLog = (date) => ({
  type: 'REMOVE_LOG',
  date,
});
export const editLog = (date, updates) => ({
  type: 'EDIT_LOG',
  date,
  updates,
});
export const setLogs = (logs) => ({
  type: 'SET_LOGS',
  logs,
})