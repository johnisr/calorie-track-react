import React from 'react';
import { shallow } from 'enzyme';
import Foods from './Foods';

it('should render FoodDashboardPage correctly', () => {
  const wrapper = shallow(<Foods />);
  expect(wrapper).toMatchSnapshot();
})