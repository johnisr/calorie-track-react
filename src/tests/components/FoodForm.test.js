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
  
  describe('amountInput changes', () => {
    it('should set amountInput on input change', () => {
      const value = '100 grams';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(1).simulate('change', {
        target: { value },
      });
      expect(wrapper.state('amountUnit')).toBe(value);
    });
  
    it('should set amount on amountInput change and blur', () => {
      const value = '100 grams';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(1).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('amount')).toBe('100');
    });
  
    it('should set unit on amountInput change and blur', () => {
      const value = '100 grams';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(1).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('unit')).toBe('grams');
    });
  
    it('should not set amount on amountInput change with first string not number and blur', () => {
      const value = 'some grams';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(1).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('amount')).toBe('');
    });
  });

  it('should set amount on input change', () => {
    const value = '100';
    const wrapper = shallow(<FoodForm />);
    
    // amountInput hides amount until blurred
    wrapper.find('input').at(1).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('amount')).toBe('');
    
    wrapper.find('input').at(1).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('amount')).toBe(value);
  });

  it('should not set amount on non-number input change', () => {
    const value = 'abc';
    const wrapper = shallow(<FoodForm />);
    
    // amountInput hides amount until blurred
    wrapper.find('input').at(1).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('amount')).toBe('');
    
    wrapper.find('input').at(1).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('amount')).toBe('');
  });

  it('should set unit on input change', () => {
    const value = 'grams';
    const wrapper = shallow(<FoodForm />);

    // amountInput hides unit until blurred
    wrapper.find('input').at(1).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('unit')).toBe('');

    wrapper.find('input').at(2).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('unit')).toBe(value);
  });

  describe('macros changes', () => {

    it('should set macros on input change', () => {
      const value = '5 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('change', {
        target: { value },
      });
      expect(wrapper.state('macros')).toBe(value);
    });
    
    it('should set carbohydrates on macros on input change and blur', () => {
      const value = '5 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('carbohydrates')).toBe('5');
    });

    it('should not set carbohydrates on macros on non-number input change and blur', () => {
      const value = 'a 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('carbohydrates')).toBe('');
    });

    it('should set protein on macros on input change and blur', () => {
      const value = '5 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('protein')).toBe('5');
    });

    it('should not set protein on macros on non-number input change and blur', () => {
      const value = '5 a 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('protein')).toBe('');
    });
    
    it('should set fat on macros on input change and blur', () => {
      const value = '5 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('fat')).toBe('5');
    });

    it('should not set fat on macros on non-number input change and blur', () => {
      const value = '5 5 a 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('fat')).toBe('');
    });

    it('should set calories on macros on input change and blur', () => {
      const value = '5 5 5 85';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('calories')).toBe('85');
    });

    it('should not set calories on macros on non-number input change and blur', () => {
      const value = '5 5 5 a';
      const wrapper = shallow(<FoodForm />);
      wrapper.find('input').at(2).simulate('blur', {
        target: { value },
      });
      expect(wrapper.state('calories')).toBe('');
    });
  });

  it('should set carbohydrates on input change', () => {
    const value = '200';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(2).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('carbohydrates')).toBe(value);
  });

  it('should not set carbohydrates on non-number input change', () => {
    const value = 'abc';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(2).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('carbohydrates')).toBe('');
  });
  
  it('should set protein on input change', () => {
    const value = '50';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(3).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('protein')).toBe(value);
  });

  it('should set not protein on non-number input change', () => {
    const value = 'abc';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(3).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('protein')).toBe('');
  });
  
  it('should set fat on input change', () => {
    const value = '20';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(4).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('fat')).toBe(value);
  });

  it('should not set fat on non-number input change', () => {
    const value = 'abc';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(4).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('fat')).toBe('');
  });
  
  it('should set calories on non-number input change', () => {
    const value = '1000';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(5).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('calories')).toBe(value);
  });

  it('should not set calories on non-number input change', () => {
    const value = 'abc';
    const wrapper = shallow(<FoodForm />);

    // macros input hides amount until blurred
    wrapper.find('input').at(2).simulate('blur', {
      target: { value: '' },
    });
    expect(wrapper.state('carbohydrates')).toBe('');

    wrapper.find('input').at(5).simulate('change', {
      target: { value },
    });
    expect(wrapper.state('calories')).toBe('');
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
    timesUsed: foods[1].timesUsed,
    createdAt: foods[1].createdAt,
  });
});