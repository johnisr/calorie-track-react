import database from '../firebase/firebase';
import moment from 'moment';

export const defaultLog = {
  date: 0,
  weight: 0,
  unit: 'lb',
  foods: [],
};

export const addLog = (log) => ({
  type: 'ADD_LOG',
  log,
});

export const startAddLog = (data = {}) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      weight = 0,
      unit = 'lb',
      foods = [],
      date = moment(),
    } = data;
    const log = { weight, unit, foods, date };

    try {
      await database.ref(`users/${uid}/logs/${date}`).set(log);
      dispatch(addLog(log));
    } catch (e) {

    };
  };
};

export const removeLog = (date) => ({
  type: 'REMOVE_LOG',
  date,
});

export const startRemoveLog = (date) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    try {
      await database.ref(`users/${uid}/logs/${date}`).remove();
      dispatch(removeLog(date));
    } catch (e) {

    };
  };
};

export const editLog = (date, updates) => ({
  type: 'EDIT_LOG',
  date,
  updates,
});

export const startEditLog = (date, updates) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    try {
      await database.ref(`users/${uid}/logs/${date}`).update(updates);
      dispatch(editLog(date, updates));
    } catch (e) {
      
    }
  };
};

export const setLogs = (logs) => ({
  type: 'SET_LOGS',
  logs,
});

export const startSetLogs = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    try {
      const snapshot = await database.ref(`users/${uid}/logs`).once('value');
      const logs = [];
      snapshot.forEach((log) => {
        logs.push(log.val());
      });
      dispatch(setLogs(logs));
    } catch (e) {

    }
  };
};