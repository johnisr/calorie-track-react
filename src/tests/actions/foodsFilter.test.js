import {
  setFoodNameFilter,
  sortByUsage,
  sortByDate,
  setMaxFoodsShown,
  setOffset,
} from '../../actions/foodsFilter';

it('should create a setFoodNameFilter action object', () => {
  const name = 'abc';
  const action = setFoodNameFilter(name);
  expect(action).toEqual({
    type: 'SET_FOOD_NAME_FILTER',
    name,
  });
});

it('should create a sortByUsage action object', () => {
  const action = sortByUsage();
  expect(action).toEqual({
    type: 'SORT_BY_USAGE',
  });
});

it('should create a sortByDate action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

it('should create a setMaxFoods action object', () => {
  const max = 10;
  const action = setMaxFoodsShown(max);
  expect(action).toEqual({
    type: 'SET_MAX_FOODS_SHOWN',
    max,
  });
});

it('should create a setOffset action object', () => {
  const offset = 0;
  const action = setOffset(0);
  expect(action).toEqual({
    type: 'SET_OFFSET',
    offset,
  });
});

