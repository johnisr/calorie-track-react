import React from 'react';
import { shallow } from 'enzyme';
import { AddFoodFormToCurrentLog } from './AddFoodFormToCurrentLog';
import foods from '../../../../tests/fixtures/foods';

let wrapper, addFoodToCurrentLog;
beforeEach(() => {
  addFoodToCurrentLog = jest.fn();

  wrapper = shallow(<AddFoodFormToCurrentLog
    addFoodToCurrentLog={addFoodToCurrentLog}
  />);
});

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle submit', () => {
  wrapper.find('FoodForm').prop('handleSubmit')(foods[1]);
  expect(addFoodToCurrentLog).toHaveBeenLastCalledWith(foods[1]);
});