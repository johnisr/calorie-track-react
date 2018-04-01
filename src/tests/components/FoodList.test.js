/* globals test, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { FoodList } from '../../components/FoodList';
import foods from '../fixtures/foods';

test('should render FoodList with foods', () => {
  const wrapper = shallow(<FoodList foods={foods} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render foodList with empty message', () => {
  const wrapper = shallow(<FoodList foods={[]} />);
  expect(wrapper).toMatchSnapshot();
});
