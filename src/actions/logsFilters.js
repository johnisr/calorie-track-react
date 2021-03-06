export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate,
});

export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate,
});

export const sortByNewest = () => ({
  type: 'SORT_BY_NEWEST',
});

export const sortByOldest = () => ({
  type: 'SORT_BY_OLDEST',
});

export const setMaxLogsShown = (max = 7) => ({
  type: 'SET_MAX_LOGS_SHOWN',
  max,
});

export const setLogsOffset = (offset = 0) => ({
  type: 'SET_LOGS_OFFSET',
  offset,
});
