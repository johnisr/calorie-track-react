import React from 'react';
import { shallow } from 'enzyme';
import FoodForm from '../../components/FoodForm';
import foods from '../fixtures/foods';

it('should render FoodForm correctly', () => {
  const wrapper = shallow(<FoodForm />);
  expect(wrapper).toMatchSnapshot();
});

it('should render Foodfrom with food data', () => {
  const wrapper = shallow(<FoodForm food={foods[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

describe('Changing input and expecting state to change', () => {
  it('should set name on input change', () => {
    const value = 'New name';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(0).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('name')).toBe(value);
  });
  
  it('should set amount on input change', () => {
    const value = '100';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(1).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('amount')).toBe(value);
  });

  it('should set unit on input change', () => {
    const value = 'grams';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(2).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('unit')).toBe(value);
  });
  
  it('should set carbohydrates on input change', () => {
    const value = '200';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(3).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('carbohydrates')).toBe(value);
  });
  
  it('should set protein on input change', () => {
    const value = '50';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(4).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('protein')).toBe(value);
  });
  
  it('should set fat on input change', () => {
    const value = '20';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(5).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('fat')).toBe(value);
  });
  
  it('should set calories on input change', () => {
    const value = '1000';
    const wrapper = shallow(<FoodForm />);
    wrapper.find('input').at(6).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('calories')).toBe(value);
  });
});

it('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<FoodForm food={foods[1]} handleSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    name: foods[1].name,
    amount: foods[1].amount,
    unit: foods[1].unit,
    carbohydrates: foods[1].carbohydrates,
    protein: foods[1].protein,
    fat: foods[1].fat,
    calories: foods[1].calories,
  });
});