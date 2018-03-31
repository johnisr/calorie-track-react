import React from 'react';
import { createStore } from 'redux';
import moment from 'moment';
import foods from '../tests/fixtures/foods';

// fixtures

const logs = [{
  date: moment(0),
  weight: 200,
  unit: 'lb',
  foods: [
    foods[0],
    foods[0]
  ],
}, {
  date: moment().add(1, 'day'),
  weight: 201,
  unit: 'lb',
  foods: [
    foods[0],
    foods[1],
    foods[2]
  ],
}, {
  date: moment(0).subtract(1, 'day'),
  weight: 202,
  unit: 'lb',
  foods: [
    foods[2],
    foods[0],
    foods[1]
  ],
}];

// actions
const addLog = (log) => ({
  type: 'ADD_LOG',
  log,
});

const removeLog = (date) => ({
  type: 'REMOVE_LOG',
  date,
});
const editLog = (date, updates) => ({
  type: 'EDIT_LOG',
  date,
  updates,
});
const setLogs = (logs) => ({
  type: 'SET_LOGS',
  logs,
})

// Reducer
const reducer = (state = [], action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_LOG': {
      return [...state, action.log];
    }
    case 'REMOVE_LOG': {
      return state.filter(({ date }) => !date.isSame(action.date));
    }
    case 'EDIT_LOG': {
      const newState = state.map((log) => {
        if (log.date.isSame(action.date)) {
          console.log('SAME');
          return {
            ...log,
            ...action.updates,
          };
        }
        return log;
      });
      return newState;
    }
    case 'SET_LOGS': {
      return action.logs;
    }
    default: {
      return state;
    }
  }
};

// Store
const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {
  console.log((store.getState()));
});

// Dispatches
store.dispatch(addLog(logs[0]));
store.dispatch(addLog(logs[1]));
store.dispatch(editLog(logs[0].date, { food: foods[0], weight: 190 }));
store.dispatch(removeLog(logs[1].date));
store.dispatch(removeLog(logs[0].date));
store.dispatch(setLogs(logs));

// SFC
const Playground = () => (
  <div>
    This is playground!
  </div>
);

export default Playground;