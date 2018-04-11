/* globals test, expect */
import React from 'react';
import { shallow } from 'enzyme';
import FoodList from './FoodList';
import foods from '../../tests/fixtures/foods';


it('should render FoodList with foods', () => {
  const wrapper = shallow(
    <FoodList foods={foods} />);
  expect(wrapper).toMatchSnapshot();
});

it('should render foodList with empty message', () => {
  const wrapper = shallow(
    <FoodList foods={[]} />);
  expect(wrapper).toMatchSnapshot();
});
