import React from 'react';
import { shallow } from 'enzyme';
import { CurrentLogFoodListContainer } from './CurrentLogFoodListContainer';
import foodsData from '../../../../tests/fixtures/foods';

let removeFoodFromCurrentLog, editCurrentEditLog, editFoodFromCurrentLog, foods, wrapper;
beforeEach(() => {
  removeFoodFromCurrentLog = jest.fn();
  editCurrentEditLog = jest.fn();
  editFoodFromCurrentLog = jest.fn();
  foods = foodsData;
  wrapper = shallow(<CurrentLogFoodListContainer
    foods={foods}
    removeFoodFromCurrentLog={removeFoodFromCurrentLog}
    editCurrentEditLog={editCurrentEditLog}
    editFoodFromCurrentLog={editFoodFromCurrentLog}
  />);
});

it('should render CurrentLogFoodListContainer', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handleRemove current log', () => {
  wrapper.find('CurrentLogFoodList').prop('onRemove')(0);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ editFoodIndex: undefined });
  expect(removeFoodFromCurrentLog).toHaveBeenLastCalledWith(0);
});

it('should handleEdit current log', async () => {
  await wrapper.find('CurrentLogFoodList').prop('onEdit')(2);
  expect.assertions(3);
  expect(editCurrentEditLog).toHaveBeenCalledTimes(2);
  expect(editCurrentEditLog).toHaveBeenCalledWith({ editFoodIndex: undefined });
  expect(editCurrentEditLog).toHaveBeenCalledWith({ editFoodIndex: 2 });
});

it('should handleRemove current log', () => {
  wrapper.find('CurrentLogFoodList').prop('onRemove')(1);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ editFoodIndex: undefined });
  expect(removeFoodFromCurrentLog).toHaveBeenLastCalledWith(1);
});

it('should handleMultiplierChange', () => {
  const e = {target : { value: '3' }};
  wrapper.find('CurrentLogFoodList').prop('onMultiplierChange')(1, e);
  expect(editFoodFromCurrentLog).toHaveBeenLastCalledWith(1, {
    amount: +(foods[1].amount * 3).toFixed(2),
    carbohydrates: +(foods[1].carbohydrates * 3).toFixed(2),
    protein: +(foods[1].protein * 3).toFixed(2),
    fat: +(foods[1].fat * 3).toFixed(2),
    calories: +(foods[1].calories * 3).toFixed(2),
    multiplier: '3',
  });  
});

it('should handleMultiplierChange with float (2 decimals)', () => {
  const e = {target : { value: '3.25' }};
  wrapper.find('CurrentLogFoodList').prop('onMultiplierChange')(1, e);
  expect(editFoodFromCurrentLog).toHaveBeenLastCalledWith(1, {
    amount: +(foods[1].amount * 3.25).toFixed(2),
    carbohydrates: +(foods[1].carbohydrates * 3.25).toFixed(2),
    protein: +(foods[1].protein * 3.25).toFixed(2),
    fat: +(foods[1].fat * 3.25).toFixed(2),
    calories: +(foods[1].calories * 3.25).toFixed(2),
    multiplier: '3.25',
  });  
});

it('should not handleMultiplierChange with float (3 decimals)', () => {
  const e = {target : { value: '3.251' }};
  wrapper.find('CurrentLogFoodList').prop('onMultiplierChange')(1, e);
  expect(editFoodFromCurrentLog).not.toHaveBeenCalled();
});

it('should not handleMultiplierChange with non number', () => {
  const e = {target : { value: 'abc' }};
  wrapper.find('CurrentLogFoodList').prop('onMultiplierChange')(1, e);
  expect(editFoodFromCurrentLog).not.toHaveBeenCalled();
});