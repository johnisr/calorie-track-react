import foodsFilterReducer from '../../reducers/foodsFilters';

it('should setup default filter values', () => {
  const state = foodsFilterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    name: '',
    sortBy: 'usage',
    maxFoodsShown: 10,
    offset: 0,
  });
});

it('should set name filter', () => {
  const name = 'A long food name';
  const action = { type: 'SET_FOOD_NAME_FILTER', name };
  const state = foodsFilterReducer(undefined, action);
  expect(state.name).toBe(name);
});

it('should set sort by to usage', () => {
  const action = { type: 'SORT_BY_USAGE' };
  const currentState = {
    name: '',
    sortBy: 'date',
    maxFoodsShown: 10,
    offset: 0,
  };
  const state = foodsFilterReducer(currentState, action);
  expect(state.sortBy).toBe('usage');
});

it('should set sort by to date', () => {
  const action = { type: 'SORT_BY_DATE' };
  const state = foodsFilterReducer(undefined, action);
  expect(state.sortBy).toBe('date');
});

it('should set max foods shown filter', () => {
  const max = 50;
  const action = { type: 'SET_MAX_FOODS_SHOWN', max };
  const state = foodsFilterReducer(undefined, action);
  expect(state.maxFoodsShown).toBe(max);
});

it('should set offset filter', () => {
  const offset = 50;
  const action = { type: 'SET_FOODS_OFFSET', offset };
  const state = foodsFilterReducer(undefined, action);
  expect(state.offset).toBe(offset);
});