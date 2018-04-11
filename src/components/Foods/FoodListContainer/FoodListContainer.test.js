import React from 'react';
import { shallow } from 'enzyme';
import { FoodListContainer } from './FoodListContainer';
import foodsData from '../../../tests/fixtures/foods';

let foods, currentFood, addCurrentFood, removeCurrentFood, wrapper;
beforeEach(() => {
  foods = foodsData;
  currentFood = foods[1];
  addCurrentFood = jest.fn();
  removeCurrentFood = jest.fn();
  wrapper = shallow(<FoodListContainer
    foods={foods}
    currentFood={currentFood}
    addCurrentFood={addCurrentFood}
    removeCurrentFood={removeCurrentFood}
  />);

});

it ('should render currently', () => {
  expect(wrapper).toMatchSnapshot();
});

it ('should handleClick with nonempty currentFood', () => {
  wrapper.find('FoodList').prop('onClick')(foods[1]);
  expect(removeCurrentFood).toHaveBeenLastCalledWith(foods[1]);
  expect(addCurrentFood).toHaveBeenLastCalledWith(foods[1]);
});

it ('should handleClick empty currentFood', () => {
  const currentFood = { id: '' };
  wrapper = shallow(<FoodListContainer
    foods={foods}
    currentFood={currentFood}
    addCurrentFood={addCurrentFood}
    removeCurrentFood={removeCurrentFood}
  />);
  wrapper.find('FoodList').prop('onClick')(foods[2]);
  expect(removeCurrentFood).not.toHaveBeenCalled();
  expect(addCurrentFood).toHaveBeenLastCalledWith(foods[2]);
});