import React from 'react';
import { shallow } from 'enzyme';
import LogList from './LogList';
import logsData from '../../../../tests/fixtures/logs';
import moment from 'moment';

it('should render LogList', () => {
  const wrapper = shallow(<LogList
    logs={logsData}
    onEdit={jest.fn()}
    onCreate={jest.fn()}
  />);
  wrapper.setState({date: moment(0) });
  expect(wrapper).toMatchSnapshot();
});

it('should render LogList with no logs', () => {
  const wrapper = shallow(<LogList
    logs={[]}
    onEdit={jest.fn()}
    onCreate={jest.fn()}
  />);
  wrapper.setState({date: moment(0) });
  expect(wrapper).toMatchSnapshot();
});

it('should render LogList with no logs', () => {
  const wrapper = shallow(<LogList
    logs={[]}
    onEdit={jest.fn()}
    onCreate={jest.fn()}
  />);
  wrapper.setState({date: moment(0) });
  expect(wrapper).toMatchSnapshot();
});

it('should set date on dates change', () => {
  const wrapper = shallow(<LogList
    logs={logsData}
    onEdit={jest.fn()}
    onCreate={jest.fn()}
  />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(moment(logsData[0].date));
  expect(wrapper.state('date')).toEqual(moment(logsData[0].date));
});

it('should set calendarFocused on focus change', () => {
  const wrapper = shallow(<LogList
    logs={logsData}
    onEdit={jest.fn()}
    onCreate={jest.fn()}
  />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
});