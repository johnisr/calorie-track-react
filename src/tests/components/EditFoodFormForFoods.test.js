import React from 'react';
import { shallow } from 'enzyme';
import { EditFoodFormForFoods } from '../../components/EditFoodFormForFoods';
import foods from '../fixtures/foods';

let startEditFood, startRemoveFood, removeCurrentFood, wrapper;
beforeEach(() => {
  startEditFood = jest.fn();
  startRemoveFood = jest.fn();
  removeCurrentFood = jest.fn();
  wrapper = shallow(
    <EditFoodFormForFoods
    startEditFood={startEditFood}
    startRemoveFood={startRemoveFood}
    removeCurrentFood={removeCurrentFood}
    food={foods[1]}
    />
  )
});

it('should render EditFood', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle startEditFood', () => {
  wrapper.find('FoodForm').prop('handleSubmit')(foods[1]);
  expect(startEditFood).toHaveBeenLastCalledWith(foods[1].id, foods[1]);
});

it('should handle startRemoveFood', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(startRemoveFood).toHaveBeenLastCalledWith(foods[1]);
});

it('should handle removeCurrentFood', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(removeCurrentFood).toHaveBeenCalled();
});

