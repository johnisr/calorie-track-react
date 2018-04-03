import moment from 'moment';

export default (logs, { startDate, endDate, sortBy, maxLogsShown, offset }) => {
  return logs
    .filter(log => {
      const logDate = log.date;
      const startDateMatch = startDate ? startDate.isSameOrBefore(logDate, 'day') : true;
      const endDateMatch = endDate ? logDate.isSameOrBefore(endDate, 'day') : true;
      return startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'newest') {
        return a.createdAt < b.createdAt ? -1 : 1;
      }
      return 1;
    });
};