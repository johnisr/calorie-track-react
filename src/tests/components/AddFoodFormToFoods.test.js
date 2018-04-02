import React from 'react';
import { shallow } from 'enzyme';
import { AddFoodFormToFoods } from '../../components/AddFoodFormToFoods';
import foods from '../fixtures/foods';

let startAddFood, wrapper;
beforeEach(() => {
  startAddFood = jest.fn();
  wrapper = shallow(<AddFoodFormToFoods startAddFood={startAddFood}/>);
});

it('should render AddFood correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle onSubmit', () => {
  wrapper.find('FoodForm').prop('handleSubmit')(foods[1]);
  expect(startAddFood).toHaveBeenLastCalledWith(foods[1]);
});