import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { addLog, removeLog, editLog, setLogs, startAddLog, startSetLogs, startEditLog, startRemoveLog } from '../../actions/logs';
import logs from '../fixtures/logs';
import foods from '../fixtures/foods';

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

describe('Asynchronous Actions With firebase', () => {
  const createMockStore = configureMockStore([thunk]);
  const uid = 'someuidcreated456';
  const defaultAuthState = { auth: { uid } };

  beforeEach((done) => {
    const logsData = {};
    logs.forEach(({ date, weight, unit, foods, total }) => {
      logsData[date] = { date, weight, unit, foods, total };
    });
    database.ref(`users/${uid}/logs`).set(logsData).then(() => done());
  });

  it('should add log to database and dispatch action store', async () => {
    const store = createMockStore(defaultAuthState);
    const log = {
      date: 11111,
      weight: 300,
      unit: 'lb',
      foods: [
        foods[1],
        foods[2],
        foods[0],
      ],
      total: {
        carbohydrates: 0,
        fat: 0,
        protein: 0,
        calories: 0,
      }
    };
    await store.dispatch(startAddLog(log));
    
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_LOG',
      log,
    });
    const snapshot = await database.ref(`users/${uid}/logs/${log.date}`).once('value');
    expect(snapshot.val()).toEqual(log);
  });

  it('should fetch logs from firebase and set them to store', async () => {
    const store = createMockStore(defaultAuthState);
    await store.dispatch(startSetLogs());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_LOGS',
      logs,
    });
  });

  it('should edit logs from database and dispatch edit to store', async () => {
    const store = createMockStore(defaultAuthState);
    const { date } = logs[2];
    const updates = {
      weight: 100,
      unit: 'kg',
    };
    await store.dispatch(startEditLog(date, updates));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_LOG',
      date,
      updates,
    });

    const snapshot = await database.ref(`users/${uid}/logs/${date}`).once('value');
    expect(snapshot.val().weight).toBe(100);
    expect(snapshot.val().unit).toBe('kg');
  });

  it('should remove logs from database and dispatch remove to store', async () => {
    const store = createMockStore(defaultAuthState);
    const { date } = logs[1];
    await store.dispatch(startRemoveLog(date));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_LOG',
      date,
    });

    const snapshot = await database.ref(`users/${uid}/foods/${date}`).once('value');
    expect(snapshot.val()).toBeFalsy();
  });
});