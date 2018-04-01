import React from 'react';
import { shallow } from 'enzyme';
import FoodListItem from '../../components/FoodListItem';
import foods from '../fixtures/foods';

it('should render FoodListItem correctly', () => {
  const wrapper = shallow(<FoodListItem {...foods[2]}/>);
  expect(wrapper).toMatchSnapshot();
});