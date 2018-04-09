import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

it('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').at(1).simulate('click');
  expect(startLogout).toHaveBeenCalled();
});