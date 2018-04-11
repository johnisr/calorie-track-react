import React from 'react';
import { shallow } from 'enzyme';
import CurrentLog from './CurrentLog';
import logs from '../../../../tests/fixtures/logs';

it('should render currentLog', () => {
  const wrapper = shallow(<CurrentLog
    currentLog={logs[0]}
    onWeightChange={jest.fn()}
    onLbsSelected={jest.fn()}
    onKgsSelected={jest.fn()}
    onRemove={jest.fn()}
    onSubmit={jest.fn()}
  />);
  expect(wrapper).toMatchSnapshot();
});
