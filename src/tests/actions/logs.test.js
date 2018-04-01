import { addLog, removeLog, editLog, setLogs } from '../../actions/logs';
import logs from '../fixtures/logs';

test('should setup addLog action object', () => {
  const action = addLog(logs[0]);
  expect(action).toEqual({
    type: 'ADD_LOG',
    log: logs[0],
  })
});

test('should setup removeLog action object', () => {
  const action = removeLog(logs[1].date);
  expect(action).toEqual({
    type: 'REMOVE_LOG',
    date: logs[1].date,
  })
});

test('should setup editLog action object', () => {
  const action = editLog(logs[1].date, { weight: 190 });
  expect(action).toEqual({
    type: 'EDIT_LOG',
    date: logs[1].date,
    updates: { weight: 190 },
  })
});

test('should setup setLogs action object', () => {
  const action = setLogs(logs);
  expect(action).toEqual({
    type: 'SET_LOGS',
    logs,
  })
});