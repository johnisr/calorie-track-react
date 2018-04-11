import React from 'react';
import { shallow } from 'enzyme';
import { CurrentLogAddFoodListContainer } from './CurrentLogAddFoodListContainer';
import foods from '../../../../tests/fixtures/foods';

it('should render correctly with no foods', () => {
  const wrapper = shallow(<CurrentLogAddFoodListContainer
    foods={[]}
    addFoodToCurrentLogFromList={jest.fn()} 
  />)
  expect(wrapper).toMatchSnapshot();
});

it('should render correctly with foods', () => {
  const wrapper = shallow(<CurrentLogAddFoodListContainer
    foods={foods}
    addFoodToCurrentLogFromList={jest.fn()} 
  />)
  expect(wrapper).toMatchSnapshot();
});

it('should handleClick', () => {
  const addFoodToCurrentLogFromList = jest.fn()
  const wrapper = shallow(<CurrentLogAddFoodListContainer
    foods={foods}
    addFoodToCurrentLogFromList={addFoodToCurrentLogFromList} 
  />)
  
  wrapper.find('FoodList').prop('onClick')(foods[1]);
  expect(addFoodToCurrentLogFromList).toHaveBeenLastCalledWith(foods[1]);
})