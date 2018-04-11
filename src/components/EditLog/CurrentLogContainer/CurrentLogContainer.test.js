import React from 'react';
import { shallow } from 'enzyme';
import { CurrentLogContainer } from './CurrentLogContainer';
import logsData from '../../../tests/fixtures/logs';
import foodsData from '../../../tests/fixtures/foods';

let editCurrentEditLog,
removeCurrentEditLog,
startEditLog,
startEditFood,
startRemoveLog,
currentLog,
logs,
foods,
history,
wrapper;

beforeEach(() => {
  editCurrentEditLog = jest.fn();
  removeCurrentEditLog = jest.fn();
  startEditLog = jest.fn();
  startEditFood = jest.fn();
  startRemoveLog = jest.fn();
  currentLog = logsData[2];
  logs = logsData;
  foods = foodsData;
  history = { push: jest.fn() };
  wrapper = shallow(<CurrentLogContainer
    editCurrentEditLog={editCurrentEditLog}
    currentLog={currentLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
    history={history}
    logs={logs}
    foods={foods}
  />)
});

it('should render CurrentLogContainer', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handleRemove log', () => {
  wrapper.find('currentLog').prop('onRemove')();
  expect(startRemoveLog).toHaveBeenLastCalledWith(logsData[2].date);
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handleSubmit with empty foods', async () => {
  currentLog = {
    date: 0,
    weight: 0,
    unit: 'lb',
    foods: [],
    total: {
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0,
    }
  };
  wrapper = shallow(<CurrentLogContainer
    editCurrentEditLog={editCurrentEditLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
    history={history}
    logs={logsData}
    foods={foods}
    currentLog={currentLog}
  />)

  await wrapper.find('currentLog').prop('onSubmit')();
  expect.assertions(4);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ total: currentLog.total });
  expect(startEditLog).toHaveBeenLastCalledWith(currentLog.date, currentLog);
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handleSubmit with foods and no change', async () => {
  await wrapper.find('currentLog').prop('onSubmit')();
  expect.assertions(5);
 expect(editCurrentEditLog).toHaveBeenLastCalledWith({ total: currentLog.total });
  expect(startEditLog).toHaveBeenLastCalledWith(currentLog.date, currentLog);
  expect(startEditFood).not.toHaveBeenCalled();
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handleSubmit with a change to other fields', async () => {
  currentLog = {
    ...logsData[2],
    weight: 300,
    unit: 'kg',
  };
  
  wrapper = shallow(<CurrentLogContainer
    editCurrentEditLog={editCurrentEditLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
    history={history}
    logs={logsData}
    foods={foods}
    currentLog={currentLog}
  />)

  await wrapper.find('currentLog').prop('onSubmit')();
  expect.assertions(4);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ total: currentLog.total });
  expect(startEditLog).toHaveBeenLastCalledWith(currentLog.date, currentLog);
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handleSubmit with foods and a change (removing food)', async () => {
  currentLog = {
    ...logsData[2],
    foods: [
      foodsData[1],
    ],
  };
  const total = {
    carbohydrates: 0,
    protein: 31,
    fat: 3.6,
    calories: 165,
  };
  wrapper = shallow(<CurrentLogContainer
    editCurrentEditLog={editCurrentEditLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
    history={history}
    logs={logsData}
    foods={foods}
    currentLog={currentLog}
  />)

  await wrapper.find('currentLog').prop('onSubmit')();
  expect.assertions(5);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ total });
  expect(startEditLog).toHaveBeenLastCalledWith(currentLog.date, {
    date: currentLog.date,
    foods: currentLog.foods,
    total,
    unit: currentLog.unit,
    weight: currentLog.weight,
  });
  // food with id 3 (almonds) went from 2 timesUsed to 1 because it was left out
  expect(startEditFood).toHaveBeenLastCalledWith('3', {timesUsed: 1 });
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handleSubmit with foods and a change (adding food)', async () => {
  currentLog = {
    ...logsData[2],
    foods: [
      foods[0],
      foods[1],
      foods[2],
      foods[2],
    ],
  };
  const total = {
    carbohydrates: 49,
    protein: 47.2,
    fat: 32,
    calories: 696,
  };
  wrapper = shallow(<CurrentLogContainer
    editCurrentEditLog={editCurrentEditLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
    history={history}
    logs={logsData}
    foods={foods}
    currentLog={currentLog}
  />)

  await wrapper.find('currentLog').prop('onSubmit')();
  expect.assertions(5);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ total });
  expect(startEditLog).toHaveBeenLastCalledWith(currentLog.date, {
    date: currentLog.date,
    foods: currentLog.foods,
    total,
    unit: currentLog.unit,
    weight: currentLog.weight,
  });
  // food with id 3 (almonds) went from 2 timesUsed to 3 because another one added
  expect(startEditFood).toHaveBeenLastCalledWith('3', {timesUsed: 3 });
  expect(removeCurrentEditLog).toHaveBeenCalled();
  expect(history.push).toHaveBeenLastCalledWith('/Logs');
});

it('should handle Kgs Selected', () => {
  wrapper.find('currentLog').prop('onKgsSelected')();
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ unit: 'kgs' });
});

it('should handle Lbs Selected', () => {
  wrapper.find('currentLog').prop('onLbsSelected')();
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ unit: 'lbs' });
});

it('should handle Weight change with valid weight (integer)', () => {
  const e = {target: { value: '11' }};
  wrapper.find('currentLog').prop('onWeightChange')(e);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ weight: e.target.value });
});

it('should handle Weight change with valid weight (float, 2 decimals)', () => {
  const e = {target: { value: '200.11' }};
  wrapper.find('currentLog').prop('onWeightChange')(e);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ weight: e.target.value });
});

it('should not handle Weight change with invalid weight', () => {
  const e = {target: { value: 'abc' }};
  wrapper.find('currentLog').prop('onWeightChange')(e);
  expect(editCurrentEditLog).not.toHaveBeenCalled();
});

it('should not handle Weight change with invalid weight (float, 3 decimals)', () => {
  const e = {target: { value: '200.123' }};
  wrapper.find('currentLog').prop('onWeightChange')(e);
  expect(editCurrentEditLog).not.toHaveBeenCalled();
});