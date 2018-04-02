import React from 'react';
import { shallow } from 'enzyme';
import { FoodDashboardPage } from '../../components/FoodDashBoardPage';

it('should render FoodDashboardPage correctly', () => {
  const wrapper = shallow(<FoodDashboardPage />);
  expect(wrapper).toMatchSnapshot();
})