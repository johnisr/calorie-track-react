import moment from 'moment';
import logsFiltersReducer from '../../reducers/logsFilters';

it('should setup default filter values', () => {
  const state = logsFiltersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    startDate: moment().startOf('week'),
    endDate: moment().endOf('week'),
    sortBy: 'newest',
    maxLogsShown: 7,
    offset: 0,
  });
});

it('should set startDate filter', () => {
  const startDate = moment();
  const action = { type: 'SET_START_DATE', startDate };
  const state = logsFiltersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

it('should set endDate filter', () => {
  const endDate = moment();
  const action = { type: 'SET_END_DATE', endDate };
  const state = logsFiltersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});

it('should set sort by to oldest', () => {
  const action = { type: 'SORT_BY_OLDEST' };
  const currentState = {
    startDate: moment().startOf('week'),
    endDate: moment().endOf('week'),
    sortBy: 'newest',
    maxLogsShown: 7,
    offset: 0,
  };
  const state = logsFiltersReducer(currentState, action);
  expect(state.sortBy).toBe('oldest');
});

it('should set sort by to newest', () => {
  const action = { type: 'SORT_BY_NEWEST' };
  const state = logsFiltersReducer(undefined, action);
  expect(state.sortBy).toBe('newest');
});

it('should set maxLogsShown filter', () => {
  const max = 30;
  const action = { type: 'SET_MAX_LOGS_SHOWN', max };
  const state = logsFiltersReducer(undefined, action);
  expect(state.maxLogsShown).toBe(max);
});

it('should set logsOffset filter', () => {
  const offset = 50;
  const action = { type: 'SET_LOGS_OFFSET', offset };
  const state = logsFiltersReducer(undefined, action);
  expect(state.offset).toBe(offset);
});