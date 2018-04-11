import React from 'react';
import { shallow } from 'enzyme';
import { FoodListFilters } from './FoodListFilters';
import { foodsFilters } from '../../tests/fixtures/foodsFilters';
import foods from '../../tests/fixtures/foods';

let filters, foodsLength, setFoodNameFilter, sortByUsage, sortByDate, setMaxFoodsShown, setFoodsOffset, wrapper;
beforeEach(() => {
  filters = foodsFilters;
  foodsLength = foods.length;
  setFoodNameFilter = jest.fn();
  sortByUsage = jest.fn();
  sortByDate = jest.fn();
  setMaxFoodsShown = jest.fn();
  setFoodsOffset = jest.fn();
  wrapper = shallow(<FoodListFilters 
    filters={filters}
    foodsLength={foodsLength}
    setFoodNameFilter={setFoodNameFilter}
    sortByUsage={sortByUsage}
    sortByDate={sortByDate}
    setMaxFoodsShown={setMaxFoodsShown}
    setFoodsOffset={setFoodsOffset}
  />);
});

it('should render FoodListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle name change', () => {
  const value = 'some value';
  const e = {target: { value }};
  wrapper.find('input').at(0).simulate('change', e);
  expect(setFoodNameFilter).toHaveBeenLastCalledWith(value);
  expect(setFoodsOffset).toHaveBeenLastCalledWith(0);
});

it('should handle sort change to usage', () => {
  const value = 'usage';
  const e = {target: { value }};
  wrapper.find('select').at(0).simulate('change', e);
  expect(sortByUsage).toHaveBeenCalled();
});

it('should handle sort change to date', () => {
  const value = 'date';
  const e = {target: { value }};
  wrapper.find('select').at(0).simulate('change', e);
  expect(sortByDate).toHaveBeenCalled();
});

it('should handle max foods shown', () => {
  const value = '25';
  const e = {target: { value }};
  wrapper.find('select').at(1).simulate('change', e);
  expect(setMaxFoodsShown).toHaveBeenLastCalledWith(25);
});

it('should handle prev page click', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(setFoodsOffset).toHaveBeenLastCalledWith(filters.offset - 1);
});

it('should handle next page click', () => {
  wrapper.find('button').at(2).simulate('click');
  expect(setFoodsOffset).toHaveBeenLastCalledWith(filters.offset + 1);
});

// Buttons [Prev Page] [ 1 ] [Next Page]
it('should handle page Number click', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(setFoodsOffset).toHaveBeenLastCalledWith(0);
});

