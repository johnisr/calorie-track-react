import logsReducer from '../../reducers/logs';
import logs from '../fixtures/logs';

it('should set default state', () => {
  const state = logsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

it('should add a log', () => {
  const action = { type: 'ADD_LOG', log: logs[0] };
  const state = logsReducer(undefined, action);
  expect(state).toEqual([logs[0]]);
});

it('should edit a log', () => {
  const updates = { weight: 150 };
  const action = { type: 'EDIT_LOG', date: logs[2].date, updates };
  const state = logsReducer(logs, action);
  expect(state[2].weight).toBe(updates.weight);
});

it('should remove a log', () => {
  const updates = { weight: 150 };
  const action = { type: 'REMOVE_LOG', date: logs[1].date};
  const state = logsReducer(logs, action);
  expect(state).toEqual([logs[0], logs[2]]);
});

it('should not remove a log given wrong date', () => {
  const action = { type: 'REMOVE_LOG', date: logs[1].date + 1 };
  const state = logsReducer(logs, action);
  expect(state).toEqual(logs);
});

it('should set foods', () => {
  const action = { type: 'SET_LOGS', logs };
  const state = logsReducer(undefined, action);
  expect(state).toEqual(logs);
});