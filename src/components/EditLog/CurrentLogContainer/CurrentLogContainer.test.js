import React from 'react';
import { shallow } from 'enzyme';
import { CurrentLogContainer } from './CurrentLogContainer';
import logs from '../../../tests/fixtures/logs';

let editCurrentLog, removeCurrentEditLog, startEditLog, startEditFood, startRemoveLog, currentLog, history, wrapper;
beforeEach(() => {
  editCurrentLog = jest.fn();
  removeCurrentEditLog = jest.fn();
  startEditLog = jest.fn();
  startEditFood = jest.fn();
  startRemoveLog = jest.fn();
  currentLog = logs[2];
  history = { push: jest.fn() };
  wrapper = shallow(<CurrentLogContainer
    editCurrentLog={editCurrentLog}
    currentLog={currentLog}
    removeCurrentEditLog={removeCurrentEditLog}
    startEditLog={startEditLog}
    startEditFood={startEditFood}
    startRemoveLog={startRemoveLog}
  />)
});

it('should render CurrentLogContainer', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handleRemove log', () => {
  // wrapper.find('CurrentLog').prop('onRemove')();
  // expect(startRemoveLog).toHaveBeenLastCalledWith(logs[2].date);
  // expect(removeCurrentEditLog).toHaveBeenCalled();
  // expect(history.push).toHaveBeenLastCalledWith('/');
});

// it('should handle startEditFood', () => {
//   wrapper.find('FoodForm').prop('handleSubmit')(foods[1]);
//   expect(startEditFood).toHaveBeenLastCalledWith(foods[1].id, foods[1]);
// });