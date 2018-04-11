import React from 'react';
import { shallow } from 'enzyme';
import CurrentLogFoodList from './CurrentLogFoodList';
import foods from '../../../../../tests/fixtures/foods';

it('should render correctly with no foods', () => {
  const wrapper = shallow(<CurrentLogFoodList 
    foods={undefined}
    onMultiplierChange={jest.fn()}
    onEdit={jest.fn()}
    onRemove={jest.fn()}
  />);
  expect(wrapper).toMatchSnapshot();
});

it('should render correctly with foods', () => {
  const wrapper = shallow(<CurrentLogFoodList 
    foods={foods}
    onMultiplierChange={jest.fn()}
    onEdit={jest.fn()}
    onRemove={jest.fn()}
  />);
  expect(wrapper).toMatchSnapshot();
});