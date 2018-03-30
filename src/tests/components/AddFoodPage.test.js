import React from 'react';
import { shallow } from 'enzyme';
import { AddFoodPage } from '../../components/AddFoodPage';

it('should render AddExpensePage correctly', () => {
  const wrapper = shallow(<AddFoodPage />);
  expect(wrapper).toMatchSnapshot();
});