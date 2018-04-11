import React from 'react';
import { shallow } from 'enzyme';
import { EditLog } from './EditLog';
import logs from '../../tests/fixtures/logs';

it('should render EditLog correctly with empty currentLog', () => {
  const wrapper = shallow(<EditLog currentLog={{}}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should render EditLog correctly with currentLog', () => {
  const wrapper = shallow(<EditLog currentLog={logs[2]}/>);
  expect(wrapper).toMatchSnapshot();
});