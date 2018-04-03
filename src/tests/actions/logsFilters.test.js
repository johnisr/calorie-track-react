import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  sortByNewest,
  sortByOldest,
  setMaxLogsShown,
  setLogsOffset,
} from '../../actions/logsFilters';

it('should create a setStartDate action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

it('should create a setEndDate action object', () => {
  const action = setEndDate(moment(1000));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(1000),
  });
});

it('should create a sortByNewest action object', () => {
  const action = sortByNewest();
  expect(action).toEqual({
    type: 'SORT_BY_NEWEST',
  });
});

it('should create a sortByOldest action object', () => {
  const action = sortByOldest();
  expect(action).toEqual({
    type: 'SORT_BY_OLDEST',
  });
});

it('should create a setMaxFoods action object', () => {
  const max = 10;
  const action = setMaxLogsShown(max);
  expect(action).toEqual({
    type: 'SET_MAX_LOGS_SHOWN',
    max,
  });
});

it('should create a setOffset action object', () => {
  const offset = 0;
  const action = setLogsOffset(0);
  expect(action).toEqual({
    type: 'SET_LOGS_OFFSET',
    offset,
  });
});

