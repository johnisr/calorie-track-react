import React from 'react';
import { shallow } from 'enzyme';
import { EditLogTabs } from './EditLogTabs';

it('should render correctly', () => {
  const wrapper = shallow(<EditLogTabs activeIndex={2} />);
  expect(wrapper).toMatchSnapshot();
});