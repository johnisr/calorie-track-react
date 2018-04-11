import React from 'react';
import { shallow } from 'enzyme';
import { EditFoodFormForCurrentLog } from './EditFoodFormForCurrentLog';
import foods from '../../../../tests/fixtures/foods';

it('should render warning if no food to be edited', () => {
  wrapper = shallow(<EditFoodFormForCurrentLog
    index={undefined}
    food={undefined}
    editCurrentEditLog={jest.fn()}
    editFoodFromCurrentLog={jest.fn()}
    removeFoodFromCurrentLog={jest.fn()}
  />);
  expect(wrapper).toMatchSnapshot();
})

let wrapper, index, food, editCurrentEditLog, editFoodFromCurrentLog, removeFoodFromCurrentLog;
beforeEach(() => {
  index = 1;
  food = foods[1];
  editCurrentEditLog = jest.fn();
  editFoodFromCurrentLog = jest.fn();
  removeFoodFromCurrentLog = jest.fn();

  wrapper = shallow(<EditFoodFormForCurrentLog
    index={index}
    food={food}
    editCurrentEditLog={editCurrentEditLog}
    editFoodFromCurrentLog={editFoodFromCurrentLog}
    removeFoodFromCurrentLog={removeFoodFromCurrentLog}
  />);
});

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handleSubmit', async () => {
  const updates = {
    name: 'Chicken Thighs',
    amount: 8,
    unit: 'ounces',
    protein: 40,
    fat: 10,
    calories: 200,
  };
  await wrapper.find('FoodForm').prop('handleSubmit')(updates);
  expect(editFoodFromCurrentLog).toHaveBeenLastCalledWith(index, updates);
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ editFoodIndex: undefined });
});

it('should handleRemove', () => {
  wrapper.find('FoodForm').prop('onRemove')();
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ editFoodIndex: undefined });
  expect(removeFoodFromCurrentLog).toHaveBeenLastCalledWith(index);
});

it('should handleExt', () => {
  wrapper.find('FoodForm').prop('onExit')();
  expect(editCurrentEditLog).toHaveBeenLastCalledWith({ editFoodIndex: undefined });
});
