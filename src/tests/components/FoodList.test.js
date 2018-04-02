/* globals test, expect */
import React from 'react';
import { shallow } from 'enzyme';
import FoodList from '../../components/FoodList';
import foods from '../fixtures/foods';

let handleClick;
beforeEach(() => {
  handleClick = jest.fn();
});

it('should render FoodList with foods', () => {
  const wrapper = shallow(
    <FoodList
      foods={foods}
      handleClick={handleClick}
      buttonText={'Edit This'}
    />);
  expect(wrapper).toMatchSnapshot();
});

it('should render foodList with empty message', () => {
  const wrapper = shallow(
    <FoodList
      foods={[]}
      handleClick={handleClick}
      buttonText={'Edit This'}
    />);
  expect(wrapper).toMatchSnapshot();
});

it('should call handleClick when button Clicked', () => {
  const wrapper = shallow(
    <FoodList
      foods={foods}
      handleClick={handleClick}
      buttonText={'Edit This'}
    />);
  wrapper.find('button').at(0).simulate('click');
  expect(handleClick).toHaveBeenCalled();
});

it('should change button text', () => {
  const wrapper = shallow(
    <FoodList
      foods={foods}
      handleClick={handleClick}
      buttonText={'Edit This'}
    />);
  expect(wrapper.find('button').at(0).text()).toBe('Edit This');
  
});