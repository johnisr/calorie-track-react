import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { LogListContainer } from './LogListContainer';
import logsData from '../../../tests/fixtures/logs';

let logs, startAddLog, addCurrentEditLog, history, wrapper;
beforeEach(() => {
  logs = logsData;
  startAddLog = jest.fn();
  addCurrentEditLog = jest.fn();
  history = { push: jest.fn() }
  wrapper = shallow(<LogListContainer
    logs={logs}
    startAddLog={startAddLog}
    addCurrentEditLog={addCurrentEditLog}
    history={history}
  />);
});

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handleEdit a log', () => {
  const date = logs[1].date;
  wrapper.find('LogList').prop('onEdit')(date);
  expect(addCurrentEditLog).toHaveBeenLastCalledWith(logs[1]);
  expect(history.push).toHaveBeenLastCalledWith('/editlog');
});

it('should edit instead of create a when given a date previously used', () => {
  wrapper.find('LogList').prop('onCreate')(moment(logs[0].date));
  expect(addCurrentEditLog).toHaveBeenLastCalledWith(logs[0]);
  expect(startAddLog).not.toHaveBeenCalled();
  expect(history.push).toHaveBeenCalledWith('/editlog');
});

it('should create a new time when given an new date', () => {
  const log = {
    date: moment('20000101', 'YYYYMMDD').valueOf(),
    weight: 0,
    unit: 'lb',
    foods: [],
    total: {
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      calories: 0,
    },
  };
  wrapper.find('LogList').prop('onCreate')(moment('20000101', 'YYYYMMDD'));
  expect(startAddLog).toHaveBeenLastCalledWith(log);
  expect(addCurrentEditLog).toHaveBeenLastCalledWith(log);
  expect(history.push).toHaveBeenCalledWith('/editlog');
});