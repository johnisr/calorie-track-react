/* globals test, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { FoodListDisplayFoods } from '../../components/FoodListDisplayFoods';
import foods from '../fixtures/foods';


it('should render FoodList with foods', () => {
  const wrapper = shallow(
    <FoodListDisplayFoods foods={foods} />);
  expect(wrapper).toMatchSnapshot();
});

it('should render foodList with empty message', () => {
  const wrapper = shallow(
    <FoodListDisplayFoods foods={[]} />);
  expect(wrapper).toMatchSnapshot();
});
