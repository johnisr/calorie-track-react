import React from 'react';
import { shallow } from 'enzyme';
import { FoodsDisplayTabs } from './FoodsDisplayTabs';

it('should render correctly', () => {
  const wrapper = shallow(<FoodsDisplayTabs activeIndex={1} />);
  expect(wrapper).toMatchSnapshot();
});