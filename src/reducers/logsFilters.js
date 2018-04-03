import moment from 'moment';

const logsFiltersReducerDefaultState = {
  startDate: moment().startOf('week'),
  endDate: moment().endOf('week'),
  maxLogsShown: 7,
  offset: 0,
};

export default (state = logsFiltersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    case 'SET_MAX_LOGS_SHOWN':
      return {
        ...state,
        maxLogsShown: action.max,
      };
    case 'SET_LOGS_OFFSET':
      return {
        ...state,
        offset: action.offset,
      };
    default: {
      return state;
    }
  }
}