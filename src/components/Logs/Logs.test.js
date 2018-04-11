import React from 'react';
import { shallow } from 'enzyme';
import Logs from './Logs';

it('should render Logs correctly', () => {
 const wrapper = shallow(<Logs />);
 expect(wrapper).toMatchSnapshot();
});