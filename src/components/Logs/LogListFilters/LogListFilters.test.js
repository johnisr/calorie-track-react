import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { LogListFilters } from './LogListFilters';
import logs from '../../../tests/fixtures/logs';

let filters, logsLength, setStartDate, setEndDate, sortByNewest, sortByOldest, setMaxLogsShown, setLogsOffset, wrapper;
beforeEach(() => {
  filters = {
    startDate: moment(0),
    endDate: moment(1000),
    sortBy: 'newest',
    maxLogsShown: 7,
    offset: 0,
  };
  logsLength = logs.length;
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByNewest = jest.fn();
  sortByOldest = jest.fn();
  setMaxLogsShown = jest.fn();
  setLogsOffset = jest.fn();
  wrapper = shallow(<LogListFilters
    filters={filters}
    logsLength={logsLength}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    sortByNewest={sortByNewest}
    sortByOldest={sortByOldest}
    setMaxLogsShown={setMaxLogsShown}
    setLogsOffset={setLogsOffset}
  />);
});

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('withStyles(DateRangePicker)')
    .prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

it('should handle date focus changes', () => {
  const calendarFocused = 'startDate';
  wrapper.find('withStyles(DateRangePicker)')
    .prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

it('should change sort by to newest', () => {
  const value = 'newest';
  const e = {target: { value }};
  wrapper.find('select').at(0).simulate('change', e);
  expect(sortByNewest).toHaveBeenCalled();
})

it('should change sort by to oldest', () => {
  const value = 'oldest';
  const e = {target: { value }};
  wrapper.find('select').at(0).simulate('change', e);
  expect(sortByOldest).toHaveBeenCalled();
});

it('should change max logs shown', () => {
  const value = '14';
  const e = {target: { value }};
  wrapper.find('select').at(1).simulate('change', e);
  expect(setMaxLogsShown).toHaveBeenLastCalledWith(14);
  expect(setLogsOffset).toHaveBeenLastCalledWith(0);
});

it('should change off set with prev page click', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(setLogsOffset).toHaveBeenLastCalledWith(filters.offset - 1);
});

it('should change off set with next page click', () => {
  wrapper.find('button').at(2).simulate('click');
  expect(setLogsOffset).toHaveBeenLastCalledWith(filters.offset + 1);
});

// Buttons: [Prev Page] [1] [Next Page]
it('should change off set with next page click', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(setLogsOffset).toHaveBeenLastCalledWith(0);
});

